import { Request, Response } from 'express';
import knex from '../database/connection';

class ReformController
{
    // Mostra as imagens de reformas
    async index(request: Request, response: Response)
    {
        const images = await knex('reform_images');
        return response.json(images)
    }

    // Cria o registro de uma imagem
    async create(request: Request, response: Response)
    {
        if(!request.body.user.admin) return response.sendStatus(401);

        const image = `${process.env.BASE_URL}/uploads/` + request.file.filename;

        const insertedProduct = await knex('reform_images').insert({image});
        const product_id = insertedProduct[0];

        return response.json({
            image,
            product_id
        });
    }

    // Remove o reistro de uma imagem
    async remove(request: Request, response: Response)
    {
        if(!request.body.user.admin) return response.sendStatus(401);

        const id = request.body.id;
        const imageRemoved = await knex('reform_images').where('id', id).del();

        return response.json({
            imageRemoved: !!imageRemoved
        })

    }
}

export default ReformController;