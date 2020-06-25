// O arquivo routes vai ser utilizado como se fosse um gerenciador de rotas.
// Ele configura as rotas, tendo o funcionamento de cada uma delas sendo feito em um arquivo diferente, específico para cada rota distinta

import express from 'express';
import multer from 'multer' //Pra fazer o upload de imagens
import multerConfig from './config/multer';    

import ProductsController from './controllers/ProductsController';
import CheckoutController from './controllers/CheckoutController';
import UsersController from './controllers/UsersController';
import { celebrate , Joi} from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const productsController = new ProductsController();
const usersController = new UsersController();
const checkoutController = new CheckoutController();
const walletcontroller = require("./controllers/walletController");

routes.post("/checkout", walletcontroller.walletbutton);
routes.post("/checkout/data", checkoutController.create)

// Dá pra juntar as rotas de show do products e descriptions
routes.get('/products', productsController.index);  // Rota para obter todos os produtos cadastrados
routes.get('/products/:id', productsController.show);   // Rota para obter um produto específico
routes.get('/descriptions/:id', productsController.showDescriptions);   // Rota para obter as descrições de um produto específico

//Upload de mais imagens deveria ser feito com upload.array, mas deu problema com o typescript e precisou de uma nova rota de upload de imagens
routes.post(
    '/products',
    upload.single('images'),
    productsController.create
    );

routes.post('/description', productsController.createDesciption);

routes.post('/image/:id', upload.single('images'), productsController.image);

routes.post('/user/login', usersController.verifyUser);
routes.post('/user/reset', usersController.verifyEmail);

routes.post('/user/register',
celebrate({                                     //Dá pra passar essa validação para outro arquivo. Também dá pra mandar mensagens
    body: Joi.object().keys({                   //Personalizadas de acordo com o campo que falta para o usuário
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().min(6).max(20),
    repeat_password: Joi.ref('password'),
    admin: Joi.boolean().default(false),
    }).with('password', 'repeat_password')
}, {
    abortEarly: false // Pra ele mostrar todos os erros, não apenas o primeiro
}),
usersController.createUser);

export default routes;