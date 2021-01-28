import path from 'path'; 

// Arquivo tem algumas configurações que a nossa conexão com o banco não tem
// O arquivo knexfile é enviado nos scripts que a gente utiliza. Pra isso que ele vai ter o migrations e o seeds

// Client é o sqlite3
// Migrations são: técnicas e ferramentas que auxiliam no versionamento da base de dados durante o desenvolvimento, que normalmente evitam a escrita
// de scripts SQL e fazem as atualizações no banco por meio da própria linguagem de programação e frameworks que estejamos utilizando.
// No nosso caso, as migrations tem as tabelas criadas em javascript - Nas migrations futuras, pode ser por exemplo, que tenha um delete da tabela ou atualização
// Seeds: Serve para popular as tabelas com um valor padrão. No nosso caso, vamos popular a tabela de itens com os que nós já temos
module.exports = {
    // client: 'mysql',
    // connection: {
    //     host: 'mysql669.umbler.com',
    //     port: 41890,
    //     user: 'gabriellinke',
    //     password: 'gabrielhenrique12.',
    //     database: "bancotesteeb",
    // },
    // client: 'pg',
    // connection: {
    //     connectionString: process.env.DATABASE_URL,
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // },
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};