import Knex from 'knex';

export async function up(knex: Knex) {
    // CRIAR TABELA
    return knex.schema.createTable('tokens', table => {
        table.increments('id').primary();
        table.string('token').notNullable(); // Refresh Token
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return knex.schema.dropTable('tokens');
}