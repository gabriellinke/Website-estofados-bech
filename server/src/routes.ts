// O arquivo routes vai ser utilizado como se fosse um gerenciador de rotas.
// Ele configura as rotas, tendo o funcionamento de cada uma delas sendo feito em um arquivo diferente, específico para cada rota distinta
import express, { Request, Response, NextFunction } from 'express';
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
const jwt = require('jsonwebtoken');

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
routes.get('/category', productsController.indexCategories);     // Rota para obter as categorias
routes.get('/sold/:id', productsController.showSold);     // Rota para obter as categorias
routes.get('/email/sold/:email', productsController.showEmailSold);     // Rota para obter as categorias

//Upload de mais imagens deveria ser feito com upload.array, mas deu problema com o typescript e precisou de uma nova rota de upload de imagens
routes.post(
    '/products',
    upload.single('images'),
    authenticateToken,
    productsController.create);
routes.post('/products/delete', authenticateToken, productsController.delete);   // Rota para deletar um produto
routes.post('/products/modify', authenticateToken, productsController.modify);   // Rota para modificar um produto
routes.post('/products/list', productsController.list);     // Rota para listar determinados produtos
routes.post('/description', authenticateToken, productsController.createDescription);   // Rota para cadastrar descrições de um produto
routes.post('/remove/description', authenticateToken, productsController.removeDescription);   // Rota para remover descrições de um produto
routes.post('/image/:id', upload.single('images'), authenticateToken, productsController.image);   // Rota para cadastrar as imagens de um produto
routes.post('/remove/image', authenticateToken, productsController.removeImage);  // Rota  para remover imagens
routes.post('/category', authenticateToken, productsController.category);     // Rota para cadastrar categorias
routes.post('/products/sold', authenticateToken, productsController.sold);     // Rota para registrar um produto que foi vendido
routes.post('/products/delivered', productsController.delivered);     // Rota para mudar o estado de vendido para entregue

routes.post('/user/login', usersController.verifyUser);     // Rota para verificar o usuário e senha
routes.post('/user/reset', usersController.verifyEmail);    // Rota para verificar se o email está cadastrado e enviar um email de recuperação de senha
routes.post('/user/reset_password/:token', usersController.resetPassword);
routes.post('/user/register',                               // Rota para registrar um usuário
    celebrate({                                             // Faz a validação dos dados
        body: Joi.object().keys({                   
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

routes.post("/checkout", authenticateToken, walletcontroller.walletbutton);    // Rota para criar uma preference do Mercado Pago
routes.post("/checkout/data", checkoutController.create)    // Rota que cria uma tabela com os dados do comprador e envia esses dados por email para ter um controle

routes.post('/user/cart/add', cartController.add);          // Rota que adiciona os itens ao carrinho
routes.post('/user/cart/change', cartController.change);    // Rota que muda a quantidade de itens no carrinho
routes.post('/user/cart/remove', cartController.remove);    // Rota que remove itens do carrinho 
routes.get('/user/cart/:id', cartController.index);         // Rota que mostra todos os itens no carrinho de um usuário

routes.get('/search', searchController.index)               // Pesquisa com a barra de pesquisas
routes.get('/category/search', searchController.indexCategory)  // Pesquisa por categorias

routes.post('/token', usersController.refreshToken);    //Usa o refreshToken para obter um novo accessToken
routes.post('/logout', usersController.logout);         //Desloga o usuário
routes.post('/verify', authenticateToken, (req, res) => {   // Rota de testes para desenvolvimento. Usada para verificar um token
    res.json(req.body.user)
})

// Middleware para verificação de token
function authenticateToken(req:Request, res:Response, next:NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    let secret = "";
    if(process.env.ACCESS_TOKEN_SECRET)
        secret = process.env.ACCESS_TOKEN_SECRET

    jwt.verify(token, secret, (err:any, user:any) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.body.user = user;
        next()
    })



}

export default routes;