// O arquivo routes vai ser utilizado como se fosse um gerenciador de rotas.
// Ele configura as rotas, tendo o funcionamento de cada uma delas sendo feito em um arquivo diferente, específico para cada rota distinta

import express from 'express';
import multer from 'multer' //Pra fazer o upload de imagens
// import multerConfig from './config/multer';    Pegar do outro projeto

import PointsController from './controllers/PointsController';
import ProductsController from './controllers/ProductsController';
import ItemsController from './controllers/ItemsController';
import { celebrate , Joi} from 'celebrate';

const routes = express.Router();
// const upload = multer(multerConfig);   Ver no outro projeto

const pointsController = new PointsController();
const itemsController = new ItemsController();
const productsController = new ProductsController();

routes.get('/items', /*itemsController.index*/);

routes.get('/products', productsController.index);
routes.get('/products/:id', productsController.show);

//Para upload de mais imagens é upload.array()
routes.post(
    '/products',
    // upload.single('image'),
    // celebrate({                                     //Dá pra passar essa validação para outro arquivo. Também dá pra mandar mensagens
    //     body: Joi.object().keys({                   //Personalizadas de acordo com o campo que falta para o usuário
    //     name: Joi.string().required(),
    //     email: Joi.string().required().email(),
    //     whatsapp: Joi.number().required(),
    //     latitude: Joi.number().required(),
    //     longitude: Joi.number().required(),
    //     city: Joi.string().required(),
    //     uf: Joi.string().required().max(2),
    //     items: Joi.string().required(),      //Tem um parametro que é .regex(), com ele dava pra garantir que só teria números e vírgulas
    //     })
    // }, {
    //     abortEarly: false // Pra ele mostrar todos os erros, não apenas o primeiro
    // }),
    productsController.create
    );

export default routes;