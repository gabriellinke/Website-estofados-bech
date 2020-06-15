import { Request, Response } from 'express';
import knex from '../database/connection';
import { string } from '@hapi/joi';

class ProductsController
{
    async create(request: Request, response: Response)
    {
        const {
            name,       
            images,
            description,
            price
        } = request.body;

        const product = {
            name,       
            images: 'http://localhost:3333/uploads/' + request.file.filename,
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

    async image(request: Request, response: Response)
    {
        const { id } = request.params;
        const image = request.file.filename;

        // Pega o campo de imagem da tabela products no id passado na url. Transforma o campo em string e pega só os nomes dos arquivos
        let img = JSON.stringify(await knex.select('images').from('products').where('id', id).first());
        let imgString = img.substring(11, img.length - 2);

        // Atualiza o campo images com o que tinha antes mais o nome da nova imagem
        const finalImage = imgString + ",http://localhost:3333/uploads/" + image;
        console.log(finalImage);
        await knex('products')
            .where('id', id)
            .update({ images: finalImage })

        const product = await knex('products').where('id', id).first();
        if(!product)
        {
             // Status com começo 4 significa que houve algum erro
             return response.status(400).json({ message: 'Product not found'});
        }
        return response.json(product); 
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