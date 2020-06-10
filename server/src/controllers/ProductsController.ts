import { Request, Response } from 'express';
import knex from '../database/connection';

class ProductsController
{
    async create(request: Request, response: Response)
    {
        const {
            name,       
            image1,
            image2,
            image3,
            description,
            price
        } = request.body;

        const product = {
            name,       
            image1,
            image2,
            image3,
            description,
            price
        };

        const insertedProduct = await knex('products').insert(product);
        const product_id = insertedProduct[0];

        return response.json({
            product_id,
            ...product, 
        });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const product = await knex('products').where('id', id).first();

        if(!product)
        {
            // Status com começo 4 significa que houve algum erro
            return response.status(400).json({ message: 'Product not found'});
        }

        return response.json(product);
    }

    async index(request: Request, response: Response){
        const products = await knex('products');

        return response.json(products);
    }
}

export default ProductsController;