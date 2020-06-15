import Knex from 'knex';

export async function up(knex: Knex) {
    // CRIAR TABELA
    return knex.schema.createTable('images', table => {
        table.increments('id').primary();

        // Todo product_id dentro dessa tabela precisa ser um id valido dentro da tabela products
        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products');

        // Todo item_id dentro dessa tabela precisa ser um id valido dentro da tabela items
        table.string('image').notNullable();
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return knex.schema.dropTable('images');
}