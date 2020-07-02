import { Request, Response } from 'express';
import knex from '../database/connection';

class SearchController
{
    async index(request: Request, response: Response)
    {
        const search = request.query.search

        if(search == "")
        {
            return response.json([])
        }

        const searchString = search?.toString();
        let products:any;
        if(searchString != undefined)
        {
            products = await knex('products').where('name', 'like', `%${searchString}%`);
        }

        return response.json(products)
    }

    async indexCategory(request: Request, response: Response)
    {
        const search = request.query.search

        const searchString = search?.toString();
        let products:any;
        if(searchString != undefined)
        {
            products = await knex('products').where('category', searchString);
        }

        return response.json(products)
    }    
}

export default SearchController;