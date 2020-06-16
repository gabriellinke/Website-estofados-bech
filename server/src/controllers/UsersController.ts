import { Request, Response } from 'express';
import knex from '../database/connection';
import jsSHA from 'jssha'

class UsersController
{
    async createUser(request: Request, response: Response)
    {
        const {
            name,       
            surname,
            email,
            password
        } = request.body;

        const user = {
            name,       
            surname,
            email,
            password,
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

    async addAddress(request: Request, response: Response)
    {

    }
}

export default UsersController;