import knex from 'knex';
// Padroniza o acesso às pastas do nosso back-end pra qualquer SO
import path from 'path';

// Arquivo responsável pela conexão com o banco
// Exporta a nossa conexão com o banco de dados para as outras partes do programa 
// Objeto connection ta recebendo as configurações do nosso banco de dados
const connection = knex({
    client: 'pg',
    // Qual o arquivo em que vamos armazenar nosso arquivo do banco de dados
    connection: {
        database: "test",
        user: 'postgres',
        password: 'gabrielhenrique12.'
    },
    useNullAsDefault: true,
});

export default connection;