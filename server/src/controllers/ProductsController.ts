import { Request, Response } from 'express';
import knex from '../database/connection';

class ProductsController
{
    // Adiciona um novo produto a tabela
    async create(request: Request, response: Response)
    {
        if(!request.body.user.admin) return response.sendStatus(401);

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
        if(!request.body.user.admin) return response.sendStatus(401);

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
        if(!request.body.user.admin) return response.sendStatus(401);
        
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

        const order = request.query.order;  // Tipo de ordenamento

        // Maior para menor preço
        if(order === '10')
        {
            products.sort(function (a, b) {
                return (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0);
            });
        }

        // Menor para maior preço
        else if(order === '01')
        {            
            products.sort(function (a, b) {
                return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);
            });
        }

        // Ordena Z-A
        else if(order === 'za')
        {
            products.sort(function (a, b) {
                return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0);
            });
        }
        
        // Ordena A-Z
        else if(order === 'az')
        {
            products.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            });
        }

        const page = parseInt(String(request.query.page))
        const limit = parseInt(String(request.query.limit))
    
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {next: {}, previous: {},  quantity: 0, results: {}}
        results.quantity = products.length;

        if (endIndex < products.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }}

        results.results = products.slice(startIndex, endIndex)

        return response.json(results);
    }

    // listar determinados produtos
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

    // Cria categoria
    async category(request: Request, response: Response)
    {
        if(!request.body.user.admin) return response.sendStatus(401);

        const {
            category,
        } = request.body;

        const createdCategory = {
            category,
        }

        const alreadyExists = await knex('categories').where('category', createdCategory.category).first();
        if(alreadyExists)
            return response.json({erro: "A categoria já existe"});

        const insertedCategory = await knex('categories').insert(createdCategory);
        const category_id = insertedCategory[0];

        return response.json({
            category_id,
            ...createdCategory,
        });
    }

    // Mostra todas categorias
    async indexCategories(request: Request, response: Response)
    {
        const categories = await knex('categories');
        return response.json(categories);
    }
}

export default ProductsController;