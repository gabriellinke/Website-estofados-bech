// O arquivo routes vai ser utilizado como se fosse um gerenciador de rotas.
// Ele configura as rotas, tendo o funcionamento de cada uma delas sendo feito em um arquivo diferente, específico para cada rota distinta
import express from 'express';
import multer from 'multer' //Pra fazer o upload de imagens
import multerConfig from './config/multer';    

import ProductsController from './controllers/ProductsController';
import CheckoutController from './controllers/CheckoutController';
import UsersController from './controllers/UsersController';
import CartController from './controllers/CartController';
import SearchController from './controllers/SearchController'
import { celebrate , Joi} from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const productsController = new ProductsController();
const usersController = new UsersController();
const checkoutController = new CheckoutController();
const cartController = new CartController();
const searchController = new SearchController();
const walletcontroller = require("./controllers/walletController");

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
routes.post('/description', productsController.createDesciption);   // Rota para cadastrar descrições de um produto
routes.post('/image/:id', upload.single('images'), productsController.image);   // Rota para cadastrar as imagens de um produto
routes.post('/products/list', productsController.list);     // Rota para listar determinados produtos

routes.post('/user/login', usersController.verifyUser);     // Rota para verificar o usuário e senha
routes.post('/user/reset', usersController.verifyEmail);    // Rota para verificar se o email está cadastrado e enviar um email de recuperação de senha
routes.post('/user/register',                               // Rota para registrar um usuário
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

routes.post("/checkout", walletcontroller.walletbutton);    // Rota para criar uma preference do Mercado Pago
routes.post("/checkout/data", checkoutController.create)    // Rota que cria uma tabela com os dados do comprador e envia esses dados por email para ter um controle

routes.post('/user/cart/add', cartController.add);          // Rota que adiciona os itens ao carrinho
routes.post('/user/cart/change', cartController.change);    // Rota que muda a quantidade de itens no carrinho
routes.post('/user/cart/remove', cartController.remove);    // Rota que remove itens do carrinho 
routes.get('/user/cart/:id', cartController.index);         // Rota que mostra todos os itens no carrinho de um usuário

routes.get('/search', searchController.index)
routes.get('/category/search', searchController.indexCategory)

export default routes;