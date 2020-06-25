import { Request, Response } from 'express';
import knex from '../database/connection';

class CheckoutController
{
    async create(request: Request, response: Response)
    {
        const {
            product_id,
            productName,
            quantity,
            price,
      
            name,
            surname,
            email,
            area_code,
            phone,
            cpf,
      
            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            adjunct,
      
            url,
            checkout_id,
          } = request.body;

        const data = {
            product_id,
            productName,
            quantity,
            price,
      
            name,
            surname,
            email,
            area_code,
            phone,
            cpf,
      
            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            adjunct,
      
            url,
            checkout_id,
        };

        const insertedData = await knex('checkout_data').insert(data);
        const data_id = insertedData[0];

        return response.json({
            data_id,
            data
        });
    }
}

export default CheckoutController;