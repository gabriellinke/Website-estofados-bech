import path from 'path'; 

// Arquivo tem algumas configurações que a nossa conexão com o banco não tem
// O arquivo knexfile é enviado nos scripts que a gente utiliza. Pra isso que ele vai ter o migrations e o seeds

// Client é o sqlite3
// Migrations são: técnicas e ferramentas que auxiliam no versionamento da base de dados durante o desenvolvimento, que normalmente evitam a escrita
// de scripts SQL e fazem as atualizações no banco por meio da própria linguagem de programação e frameworks que estejamos utilizando.
// No nosso caso, as migrations tem as tabelas criadas em javascript - Nas migrations futuras, pode ser por exemplo, que tenha um delete da tabela ou atualização
// Seeds: Serve para popular as tabelas com um valor padrão. No nosso caso, vamos popular a tabela de itens com os que nós já temos
module.exports = {
    client: 'pg',
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
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};