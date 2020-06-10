import Knex from 'knex';

export async function up(knex: Knex) {
    // CRIAR TABELA
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('image1').notNullable();
        table.string('image2').notNullable();
        table.string('image3').notNullable();
        table.string('description').notNullable();
        table.decimal('price').notNullable();
    });
}

export async function down(knex: Knex) {
    // VOLTAR ATRÁS (DELETAR A TABELA)
    return knex.schema.dropTable('products');
}

/* 
    nome
    imagem1
    imagem2
    imagem3
    descrição
    preço

*/
//PODE SER QUE VÁ BOTAR UMA FICHA TÉCNICA/MODELO/COR/VETOR DE IMAGENS/TABELA COM ID->IMAGEM/PROMOÇÃO/CARACTERÍSTICAS