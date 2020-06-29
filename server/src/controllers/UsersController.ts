import { Request, Response } from 'express';
import knex from '../database/connection';
import jsSHA from 'jssha'
import jwt from 'jsonwebtoken'

import nodemailer from 'nodemailer'
require("dotenv").config();

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
            cart: "0",
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

    // Verifica se o usuário e senha estão cadastrados no banco de dados
    async verifyUser(request: Request, response: Response)
    {
        interface User{
            id: number;
            name: string;    
            surname: string;
            email: string;
            admin: boolean;
        }

        const {
            email,
            password
        } = request.body;

        const shaObj = new jsSHA("SHA3-512", "TEXT")
        shaObj.update(password);
        const HashPassword = shaObj.getHash("HEX");

        const userOk:User = await knex('users').where('email', email).where('password', HashPassword).first();
        let meuToken = null;
        
        if(userOk!==undefined)
        {
            let secret = "";
            if(process.env.SECRET)
                secret = process.env.SECRET

            meuToken = jwt.sign({ email: userOk.email, id: userOk.id, name: userOk.name, surname: userOk.surname, admin: userOk.admin }, 
                secret)
            
            return response.json({
                userOk, 
                meuToken
            })
        }

        return response.json({
            userOk: null, 
            meuToken:null
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

export default UsersController;