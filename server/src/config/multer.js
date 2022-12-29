import multer from 'multer';

import CustomError from '../utils/error';

import { IMG_EXTENSIONS } from '../constants';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/assets/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${req.user.id}-${file.originalname}`);
  },
});

const getExtension = str => str.split('.').slice(-1)[0];

export const single = (fieldName, extensions = IMG_EXTENSIONS) => {
  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      const error = !file
        ? 'File not found!'
        : !extensions.includes(getExtension(file.originalname))
        ? `Only files with extensions: ${extensions.join(', ')} are allowed`
        : file.fieldname !== fieldName
        ? 'Field Name does not match'
        : null;
      if (error) {
        return cb(new CustomError(error, 400), false);
      }
      cb(null, true);
    },
  }).single(fieldName);
};
