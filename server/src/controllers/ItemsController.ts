import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*');
    
        // Informações do banco não estão exatamente do jeito que eu quero, então faço uma serialização para transformar os dados para um novo formato mais acessivel
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            }
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;