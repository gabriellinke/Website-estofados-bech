import Knex from 'knex';

export async function seed(knex: Knex)
{
    await knex('reform_images').insert([
        { image: 'https://i.ibb.co/0mtDwCp/teste-reforma.jpg' },
        { image: 'https://i.ibb.co/kXYxjVv/teste-reforma2.jpg' },
        { image: 'https://i.ibb.co/ZXLw3Wn/teste-reforma3.jpg' },
        { image: 'https://i.ibb.co/whjWvCx/teste-reforma4.jpg' },

    ]);
}