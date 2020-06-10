import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    // Mostra os points baseados numa pesquisa feita por cidade, uf e itens
    async index(request: Request, response: Response){
        const { city, uf, items} = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://localhost:3333/uploads/${point.image}`,
            }
        });

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point)
        {
            // Status com começo 4 significa que houve algum erro
            return response.status(400).json({ message: 'Point not found'});
        }

        const serializedPoint = {
            ...point,
            image_url: `http://localhost:3333/uploads/${point.image}`,
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,       //const name = request.body.name  - Faz a mesma coisa
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        // Só vai funcionar se as 2 queries derem certo. Ex: se for tentado cadastrar um ponto com um item que não existe (Id inválido) não vai funcionar nenhuma query
        const trx = await knex.transaction();
        
        const point = {
            image: request.file.filename, //Salva o nome do arquivo de imagem
            name, //name: name - Faz a mesma coisa
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items    //Os itens vem como uma string de números separados por vírgula. Cria um vetor com cada item indo até a vírgula
            .split(',')             //Depois da um trim e transforma em númer
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
            return {
                item_id,
                point_id, 
            };
        });
    
        await trx('point_items').insert(pointItems);
    
        // Dá o insert no banco de dados
        await trx.commit();

        return response.json({
            point_id, 
            ...point, 
        });
    }
}

export default PointsController;