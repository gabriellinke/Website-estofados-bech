import { Request, Response } from 'express';
import knex from '../database/connection';
import jsSHA from 'jssha'
import jwt from 'jsonwebtoken'

import nodemailer from 'nodemailer'

class UsersController
{
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
            meuToken = jwt.sign({ email: userOk.email, id: userOk.id, name: userOk.name, surname: userOk.surname, admin: userOk.admin }, 
                'CAF40BA45BD3960E558F41B03B5A509BCC9D78D84FAD89C1C60265BE3CA5DE01') // SECRET hard coded. Devia ta em uma variável do server, mas .env não funcionou
            
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

    async verifyEmail(request: Request, response: Response)
    {
        const email = request.body.email;

        const ok = await knex('users').where('email', email).first();
        const resposta = !!ok

        const usuario = "freestepnewversion@gmail.com";
        const senha = "soufreestep";

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: usuario,
                pass: senha
            },
            tls: { rejectUnauthorized: false }
        });

        const link = "http://localhost:3000/user/login"
        const mensagem = `<p>Você está recebendo este email porque utilizou a opção para recuperar a sua senha na Loja Virtual da Estofados Bech.<br/></p>
                          <p>Clique no link abaixo para alterar a sua senha:<br/></p>
                          <a href='${link}'>${link}</a>`

        transporter.sendMail({
            from: "Estofados Bech <freestepnewversion@gmail.com>",
            to: email,
            subject: "Altere sua senha na loja Estofados Bech",
            html: mensagem
        }).then(message => {
            console.log(message);
        }).catch(err => {
            console.log(err);
        })

        return response.json({
            resposta
        })
    }

    async addAddress(request: Request, response: Response)
    {

    }
}

export default UsersController;