import Knex from 'knex';

export async function seed(knex: Knex)
{
    await knex('categories').insert([
        { category: 'sem categoria' },
        { category: 'tecidos' },
        { category: 'tapetes' },
        { category: 'cadeiras' },
        { category: 'sofás' },
    ]);
}