import { Request, Response } from 'express';
import knex from '../database/connection';
import jsSHA from 'jssha'
import jwt from 'jsonwebtoken'

import nodemailer from 'nodemailer';
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

interface User{
    id: number;
    name: string;    
    surname: string;
    email: string;
    password: string | undefined;
    admin: boolean;
}

interface UserNoPassword{
    id: number;
    name: string;    
    surname: string;
    email: string;
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
            const tokenUser:UserNoPassword = 
            {
                id: userOk.id,
                name: userOk.name,
                surname: userOk.surname,
                email: userOk.email,
                admin: userOk.admin
            }
            const accessToken = generateAccessToken(tokenUser)
            const refreshToken = jwt.sign(tokenUser, refreshSecret)

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
            const oauth2Client = new OAuth2(
                process.env.CLIENT_ID, // HARD CODED
                process.env.CLIENT_SECRET, // Client Secret        // HARD CODED
                "https://developers.google.com/oauthplayground" // Redirect URL
           );
    
            oauth2Client.setCredentials({
                fresh_token: process.env.CLIENT_REFRESH_TOKEN // HARD CODED
            });
            const accessToken = oauth2Client.getAccessToken();
    
            //ENVIAR EMAIL COM OS DADOS DO COMPRADOR E DO PRODUTO COMPRADO
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.EMAIL_USER,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.CLIENT_REFRESH_TOKEN,
                    accessToken: accessToken,
                },
                tls: { rejectUnauthorized: false }
            });
    
            let secret = "";
            if(process.env.RESET_PASSWORD_TOKEN_SECRET)
                secret = process.env.RESET_PASSWORD_TOKEN_SECRET;
        
            const token = jwt.sign({email}, secret, { expiresIn: 3600 });
            
            const link = String(process.env.RESET_PASSWORD_URL)+token
            const mensagem = `<p>Você está recebendo este email porque utilizou a opção para recuperar a sua senha na Loja Virtual da Estofados Bech.<br/></p>
                              <p>Clique <a href='${link}'>aqui</a> para alterar a sua senha.</p>
                              `
    
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

    // Reseta a senha do usuário
    async resetPassword(request: Request, response: Response)
    {
        const { token } = request.params;
        let password = request.body.password;

        // Atualiza a password como sendo o Hash da senha
        const shaObj = new jsSHA("SHA3-512", "TEXT")
        shaObj.update(password);
        password = shaObj.getHash("HEX");

        jwt.verify(token, String(process.env.RESET_PASSWORD_TOKEN_SECRET), async (err:any, token:any) => {
            console.log(err)
            if (err) return response.sendStatus(403)
            console.log(token.email)

            const emailEstaCadastrado = await knex('users').where('email', token.email).first();
            if(!emailEstaCadastrado)
            {
                // Status com começo 4 significa que houve algum erro
                return response.status(400).json({ message: 'Email não cadastrado'});
            }

            const changedUser = await knex('users').where('email', token.email).update({password})
            return response.json(changedUser)
        })
    }

    // Muda a senha do usuário
    async changePassword(request: Request, response: Response)
    {
        const {
            email,
            password,
            new_password
        } = request.body;

        const shaObj = new jsSHA("SHA3-512", "TEXT")
        shaObj.update(password);
        const HashPassword = shaObj.getHash("HEX");

        const userOk:User = await knex('users').where('email', email).where('password', HashPassword).first();

        const shaObj2 = new jsSHA("SHA3-512", "TEXT")
        shaObj2.update(new_password);
        const NewHashPassword = shaObj2.getHash("HEX");

        let ok;
        if(userOk != undefined)
            ok = await knex('users').where('email', email).update({password: NewHashPassword});

        return response.json({changed: !!ok})
    }

    // Envia um email pelo formulário da página de contatos
    async sendMessage(request: Request, response: Response)
    {
        const{
            name,
            email,
            phone,
            message
        }= request.body;

        //ENVIAR EMAIL COM OS DADOS DO COMPRADOR E DO PRODUTO COMPRADO
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID, // HARD CODED
            process.env.CLIENT_SECRET, // Client Secret        // HARD CODED
            "https://developers.google.com/oauthplayground" // Redirect URL
       );

        oauth2Client.setCredentials({
            fresh_token: process.env.CLIENT_REFRESH_TOKEN // HARD CODED
        });
        const accessToken = oauth2Client.getAccessToken();

        //ENVIAR EMAIL COM OS DADOS DO COMPRADOR E DO PRODUTO COMPRADO
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.CLIENT_REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls: { rejectUnauthorized: false }
        });

        const mensagem = `<p>${name} mandou uma mensagem através do formulário da página de contato. Seu email é ${email} e seu telefone é ${phone}. Essa foi a mensagem enviada:<br/></p>
                            ${message}`

        transporter.sendMail({
            from: `Estofados Bech <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Mensagem enviada através da página de contato",
            html: mensagem
        }).then(message => {
            console.log(message);
            return response.json({send: true})
        }).catch(err => {
            console.log(err);
            return response.json({send: false})
        })
    }
}

function generateAccessToken(user:UserNoPassword) {
    let secret = "";
    if(process.env.ACCESS_TOKEN_SECRET)
        secret = process.env.ACCESS_TOKEN_SECRET;

    return jwt.sign(user, secret, { expiresIn: 900 });
}

export default UsersController;