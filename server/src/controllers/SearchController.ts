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

        const searchString = (search?.toString())?.toLowerCase();
        let products:any;
        if(searchString != undefined)
        {
            products = await knex('products').whereRaw(`LOWER(name) LIKE ?`, [`%${searchString}%`]);
        }

        const order = request.query.order;  // Tipo de ordenamento

        // Maior para menor preço
        if(order === '10')
        {
            products.sort(function (a:any, b:any) {
                return (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0);
            });
        }

        // Menor para maior preço
        else if(order === '01')
        {            
            products.sort(function (a:any, b:any) {
                return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);
            });
        }

        // Ordena Z-A
        else if(order === 'za')
        {
            products.sort(function (a:any, b:any) {
                return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0);
            });
        }
        
        // Ordena A-Z
        else if(order === 'az')
        {
            products.sort(function (a:any, b:any) {
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

    async indexCategory(request: Request, response: Response)
    {
        const search = request.query.search

        const searchString = search?.toString();
        let products:any;
        if(searchString != undefined)
        {
            products = await knex('products').where('category', searchString);
        }

        const order = request.query.order;  // Tipo de ordenamento

        // Maior para menor preço
        if(order === '10')
        {
            products.sort(function (a:any, b:any) {
                return (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0);
            });
        }

        // Menor para maior preço
        else if(order === '01')
        {            
            products.sort(function (a:any, b:any) {
                return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);
            });
        }

        // Ordena Z-A
        else if(order === 'za')
        {
            products.sort(function (a:any, b:any) {
                return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0);
            });
        }
        
        // Ordena A-Z
        else if(order === 'az')
        {
            products.sort(function (a:any, b:any) {
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
}

export default SearchController;