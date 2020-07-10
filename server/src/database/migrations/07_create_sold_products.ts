import Knex from 'knex';

export async function up(knex: Knex) {
    // CRIAR TABELA
    return knex.schema.createTable('sold_products', table => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('quantity').notNullable();
        table.decimal('price').notNullable();
        table.string('date').notNullable();
        table.string('code').notNullable();
        table.boolean('delivered').notNullable();
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return knex.schema.dropTable('sold_products');
}