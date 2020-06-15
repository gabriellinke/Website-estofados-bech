import Knex from 'knex';

export async function up(knex: Knex) {
    // CRIAR TABELA
    return knex.schema.createTable('descriptions', table => {
        table.increments('id').primary();

        // Todo product_id dentro dessa tabela precisa ser um id valido dentro da tabela products
        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products');

        table.string('description').notNullable(); // Descrição do produto
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return knex.schema.dropTable('descriptions');
}