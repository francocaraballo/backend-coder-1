import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

// Configuracion de Multer

// Storage
const storage = multer.diskStorage(
    {
        // ubicaion del directorio donde voy a guardar los archivos
        destination: function (res, file, cb) {
            cb(null, `${__dirname}/../public/img`)
        },


        // el nombre que quiero que tengan los archivos que voy a subir
        filename: function (res, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        },
    }
)

// exporto Multer
export const uploader = multer({
    storage,
    // si se genera algun error, lo capturo
    onError: function (err, next) {
        console.log(err);
        next();
    }
})