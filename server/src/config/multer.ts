import multer from 'multer';
import path from 'path';
import crypto from  'crypto'; //Cria um hash de dados aleatórios pra salvar os arquivos

export default 
{
    storage: multer.diskStorage({ 
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback){ //Vai ser usado para gerar um nome único para cada arquivo
            const hash = crypto.randomBytes(6).toString('hex');

            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    }),
};