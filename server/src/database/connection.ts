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
    // connection: {
    //     user: "qftltjpbrysfda",
    //     password: "ed3de20453c24655f658a635302c7fc0033a540c42923e0d8c2b64ebb3262478",
    //     database: "d8ji2blcr75vs2",
    //     port: 5432,
    //     host: "ec2-3-215-83-17.compute-1.amazonaws.com",
    //     ssl: { rejectUnauthorized: false },
    // },
    // connection: {
    //     user: "znfxbikupmlhrt",
    //     password: "1e84d1272032f77637d81eb4fdad104ab3f0a9e46b265666145d2919e9fc0319",
    //     database: "d6jfjvds5jhjli",
    //     port: 5432,
    //     host: "ec2-54-157-78-113.compute-1.amazonaws.com",
    //     ssl: { rejectUnauthorized: false },
    // },
    useNullAsDefault: true,
});

export default connection;