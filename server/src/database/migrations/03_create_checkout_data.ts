import Knex from 'knex';

export async function up(knex: Knex) {
    // CRIAR TABELA
    return knex.schema.createTable('checkout_data', table => {
        table.increments('id').primary();

        // Todo product_id dentro dessa tabela precisa ser um id valido dentro da tabela products
        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products');
        table.string('productName').notNullable();
        table.decimal('price').notNullable();
        table.decimal('freightPrice').notNullable();
        table.integer('quantity').notNullable();

        //Dados pessoais
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('CPF').notNullable();         
        table.string('email').notNullable();
        table.string('area_code').notNullable();
        table.string('phone').notNullable();
        
        // Endereço
        table.string('CEP').notNullable();
        table.string('state').notNullable();
        table.string('city').notNullable();
        table.string('neighborhood').notNullable();
        table.string('street').notNullable();
        table.string('number').notNullable();
        table.string('adjunct').notNullable();

        // Link para compra e ID da compra
        table.string('url').notNullable();
        table.string('checkout_id').notNullable();
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return knex.schema.dropTable('checkout_data');
}