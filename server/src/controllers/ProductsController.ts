import { Request, Response } from 'express';
import knex from '../database/connection';

class ProductsController
{
    // Adiciona um novo produto a tabela
    async create(request: Request, response: Response)
    {
        const {
            name,       
            images,
            category,
            conditions,
            price,
            quantity,
            peso,
            formato,
            comprimento,
            altura,
            largura,
            diametro,
        } = request.body;

        const product = {
            name,       
            images: `${process.env.BASE_URL}/uploads/` + request.file.filename,
            category,
            price,          
            conditions,
            quantity,
            peso,
            formato,
            comprimento,
            altura,
            largura,
            diametro,
        };

        const insertedProduct = await knex('products').insert(product);
        const product_id = insertedProduct[0];

        return response.json({
            product_id,
            ...product, 
        });
    }

    // Adiciona as descrições dos produtos
    async createDesciption(request: Request, response: Response)
    {
        const {
            product_id,
            description,
        } = request.body;

        const productDescription = {
            product_id,
            description,
        }

        const insertedDescripiton = await knex('descriptions').insert(productDescription);
        const description_id = insertedDescripiton[0];

        return response.json({
            description_id,
            ...productDescription,
        });
    }

    // Adiciona as imagens secundárias dos produtos
    async image(request: Request, response: Response)
    {
        const { id } = request.params;
        const image = request.file.filename;

        // Pega o campo de imagem da tabela products no id passado na url. Transforma o campo em string e pega só os nomes dos arquivos
        let img = JSON.stringify(await knex.select('images').from('products').where('id', id).first());
        let imgString = img.substring(11, img.length - 2);

        // Atualiza o campo images com o que tinha antes mais o nome da nova imagem 
        const finalImage = imgString + `,${process.env.BASE_URL}/uploads/` + image;
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

    // Usado para requisição dos dados de algum produto
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

    // Mostra as descrições de algum produto
    async showDescriptions(request: Request, response: Response){
        const { id } = request.params;

        const descriptions = await knex('descriptions').where('product_id', id);

        if(!descriptions)
        {
            // Status com começo 4 significa que houve algum erro
            return response.status(400).json({ message: 'Descriptions not found'});
        }

        return response.json(descriptions);
    }

    // Mostra todos os produtos
    async index(request: Request, response: Response){
        const products = await knex('products');

        return response.json(products);
    }

    async list(request: Request, response: Response)
    {
        let productsId = request.body.products.split("-");
        let ids = productsId.map((id:any) => {
            return parseInt(id);
        })

        const productsPromisses = ids.map(async (id:any) => {
            const aux = await knex('products').where('id', id).first();
            return aux;
        });

        (async () => {
            const products = await Promise.all(productsPromisses);

            return response.json({
                products,
            });
            })();      
    }

}

export default ProductsController;