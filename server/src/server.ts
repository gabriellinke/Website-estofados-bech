import express from 'express';
import path from 'path';
import routes from './routes';
import cors from 'cors';
import { errors } from 'celebrate';     //Validação de entradas

const app = express();

app.use(cors());

// Como se fosse instalar um plugin para o express entender o body da requisição quando é no formato json
app.use(express.json());

// Utiliza para separar as rotas em um arquivo diferente, que vai ser um gerenciador de rotas
app.use(routes);

// Usado para acessar as imagens
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

//Validação dos dados cadastrados
app.use(errors());

app.listen(3333); 