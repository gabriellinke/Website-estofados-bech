import Knex from 'knex';

export async function seed(knex: Knex)
{
    await knex('users').insert([
    {
        name: 'Admin',
        surname: 'Admin',
        email: 'admin@hotmail.com',
        password: '5ec73815fe122068a506d57c351bdae988495237ba77b483e2ae01c3df3e78999e9870990b7d99a86906b6cbe2080b1ca5487646bdc70bba185e069f87260dea', //admin123
        admin: 1,
    }

    ]);
}