import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);
        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
  fileFilter: (req, file, callback) => {
    const ext = extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback('Apenas arquivos de imagem .jpg e .png são permitidos ');
    }
    return callback(null, true);
  },
  limits: {
    files: 1,
  },
};
