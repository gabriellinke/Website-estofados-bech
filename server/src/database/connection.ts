import knex from 'knex';
// Padroniza o acesso às pastas do nosso back-end pra qualquer SO
import path from 'path';

// Arquivo responsável pela conexão com o banco
// Exporta a nossa conexão com o banco de dados para as outras partes do programa 
// Objeto connection ta recebendo as configurações do nosso banco de dados
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    // client: 'mysql',
    // connection: {
    //     host: 'mysql669.umbler.com',
    //     port: 41890,
    //     user: 'gabriellinke',
    //     password: 'gabrielhenrique12.',
    //     database: "bancotesteeb",
    // },
    // connection: {
    //     database: "test",
    //     user: 'postgres',
    //     password: 'gabrielhenrique12.'
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