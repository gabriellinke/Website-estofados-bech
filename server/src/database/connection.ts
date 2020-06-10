import knex from 'knex';
// Padroniza o acesso às pastas do nosso back-end pra qualquer SO
import path from 'path';

// Arquivo responsável pela conexão com o banco
// Exporta a nossa conexão com o banco de dados para as outras partes do programa 
// Objeto connection ta recebendo as configurações do nosso banco de dados
const connection = knex({
    client: 'sqlite3',
    // Qual o arquivo em que vamos armazenar nosso arquivo do banco de dados
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;