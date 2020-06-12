// O arquivo routes vai ser utilizado como se fosse um gerenciador de rotas.
// Ele configura as rotas, tendo o funcionamento de cada uma delas sendo feito em um arquivo diferente, específico para cada rota distinta

import express from 'express';
import multer from 'multer' //Pra fazer o upload de imagens
import multerConfig from './config/multer';    

import PointsController from './controllers/PointsController';
import ProductsController from './controllers/ProductsController';
import ItemsController from './controllers/ItemsController';
import { celebrate , Joi} from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();
const productsController = new ProductsController();

routes.get('/items', /*itemsController.index*/);

routes.get('/products', productsController.index);
routes.get('/products/:id', productsController.show);

//Upload de mais imagens deveria ser feito com upload.array, mas deu problema com o typescript e precisou de uma nova rota de upload de imagens
routes.post(
    '/products',
    upload.single('images'),
    // celebrate({                                     //Dá pra passar essa validação para outro arquivo. Também dá pra mandar mensagens
    //     body: Joi.object().keys({                   //Personalizadas de acordo com o campo que falta para o usuário
    //     name: Joi.string().required(),               //O resto ta no outro arquivo
    productsController.create
    );

routes.post('/image/:id', upload.single('images'), productsController.image)

export default routes;