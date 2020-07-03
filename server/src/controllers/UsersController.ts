import { Request, Response } from 'express';
import knex from '../database/connection';
import jsSHA from 'jssha'
import jwt from 'jsonwebtoken'

import nodemailer from 'nodemailer'
require("dotenv").config();

interface User{
    id: number;
    name: string;    
    surname: string;
    email: string;
    password: undefined;
    admin: boolean;
}

class UsersController
{
    // Cria um usuário com a senha salva após ser convertida em um hash
    async createUser(request: Request, response: Response)
    {
        const {
            name,       
            surname,
            email,
            password,
            admin,
        } = request.body;

        const user = {
            name,       
            surname,
            email,
            password,
            admin,
        }

        // Atualiza a password como sendo o Hash da senha
        const shaObj = new jsSHA("SHA3-512", "TEXT")
        shaObj.update(password);
        user.password = shaObj.getHash("HEX");

        const emailEstaCadastrado = await knex('users').where('email', user.email).first();
        if(emailEstaCadastrado)
        {
            // Status com começo 4 significa que houve algum erro
            return response.status(400).json({ message: 'Email já cadastrado'});
        }

        const insertedUser = await knex('users').insert(user);
        const user_id = insertedUser[0];

        return response.json({
            user_id,
            ...user
        });
    }

    // Verifica se o usuário e senha estão cadastrados no banco de dados. Manda um access e um refresh token de resposta
    async verifyUser(request: Request, response: Response)
    {
        const {
            email,
            password
        } = request.body;

        const shaObj = new jsSHA("SHA3-512", "TEXT")
        shaObj.update(password);
        const HashPassword = shaObj.getHash("HEX");

        const userOk:User = await knex('users').where('email', email).where('password', HashPassword).first();
        
        if(userOk!==undefined)
        {
            let refreshSecret = "";
            if(process.env.REFRESH_TOKEN_SECRET)
                refreshSecret = process.env.REFRESH_TOKEN_SECRET;

            userOk.password = undefined;
            const accessToken = generateAccessToken(userOk)
            const refreshToken = jwt.sign(userOk, refreshSecret)

            // refreshTokens.push(refreshToken) Colocar o token no banco de dados de refresh Tokens
            const insertedToken = await knex('tokens').insert({token: refreshToken});

            return response.json({
                user: userOk, 
                accessToken,
                refreshToken,
                insertedToken: !!insertedToken
            })
        }

        return response.json({
            user: null, 
            accessToken:null,
            refreshToken:null,
        })
    }

    // Desloga o usuário, deletando o refreshToken
    async logout(request: Request, response: Response)
    {
        const deleted = await knex('tokens').where('token', request.body.token).del()
        return response.json({
            deleted: !!deleted,
        })
    }

    // Verifica o refresh token e envia um novo access token
    async refreshToken(request: Request, response: Response)
    {
        const refreshToken = request.body.token
        if (refreshToken == null) return response.sendStatus(401)

        const isValid = await knex('tokens').where('token', refreshToken).first();
        if (!isValid) return response.sendStatus(403)

        let refreshSecret = "";
        if(process.env.REFRESH_TOKEN_SECRET)
            refreshSecret = process.env.REFRESH_TOKEN_SECRET;
        jwt.verify(refreshToken, refreshSecret , (err:any, user:any) => {
            if (err) return response.sendStatus(403)
            const {
                id,
                name,
                surname,
                email,
                admin
            } = user;

            const userFinal = {
                id,
                name,
                surname,
                email,
                admin,
                password:undefined
            }
            const accessToken = generateAccessToken(userFinal)
            response.json({
                accessToken 
            })
        })
    }

    // Se o email estiver cadastrado, envia um email de recuperação de senha para o usuário
    async verifyEmail(request: Request, response: Response)
    {
        const email = request.body.email;

        const ok = await knex('users').where('email', email).first();
        const resposta = !!ok

        if(resposta)
        {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                },
                tls: { rejectUnauthorized: false }
            });
    
            const link = process.env.RESET_PASSWORD_URL
            const mensagem = `<p>Você está recebendo este email porque utilizou a opção para recuperar a sua senha na Loja Virtual da Estofados Bech.<br/></p>
                              <p>Clique no link abaixo para alterar a sua senha:<br/></p>
                              <a href='${link}'>${link}</a>`
    
            transporter.sendMail({
                from: `Estofados Bech <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Altere sua senha na loja Estofados Bech",
                html: mensagem
            }).then(message => {
                console.log(message);
            }).catch(err => {
                console.log(err);
            })
        }

        return response.json({
            resposta
        })
    }
}

function generateAccessToken(user:User) {
    let secret = "";
    if(process.env.ACCESS_TOKEN_SECRET)
        secret = process.env.ACCESS_TOKEN_SECRET;

    return jwt.sign(user, secret, { expiresIn: 900 });
}

export default UsersController;