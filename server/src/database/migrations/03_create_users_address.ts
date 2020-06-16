import Knex from 'knex';

export async function up(knex: Knex) {
    // CRIAR TABELA
    return knex.schema.createTable('adresses', table => {
        table.increments('id').primary();

        // Todo product_id dentro dessa tabela precisa ser um id valido dentro da tabela products
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users');

        table.integer('CPF').notNullable();         //Dados pessoais
        table.integer('phone').notNullable();

        table.integer('CEP').notNullable();    // Endereço
        table.string('state').notNullable();
        table.string('city').notNullable();
        table.string('neighborhood').notNullable();
        table.string('street').notNullable();
        table.string('number').notNullable();
        table.string('adjunct').notNullable();
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return knex.schema.dropTable('adresses');
}