import multer from 'multer';

import { IMG_EXTENSIONS } from '../constants';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/assets/uploads`);
  },
});

const getExtention = str => str.split('.').slice(-1)[0];

const single = (fieldname, extentions = IMG_EXTENSIONS) => {
  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      const error = !file
        ? 'File not found!'
        : !extentions.includes(getExtention(file.originalname))
        ? `Only files with extentions: ${extentions.map(ex => `${ex} `)} are allowed`
        : !file.fieldname === fieldname
        ? 'Field Name does not match'
        : undefined;

      if (error) {
        return cb(new Error(error));
      }
      cb(null, true);
    },
  }).single(fieldname);
};

export { single };
