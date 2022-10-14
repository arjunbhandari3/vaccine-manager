import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';

export default (err, req, res, next) => {
  //Postgres unique constriant error
  if (err.code === '23505') {
    return res.status(HttpStatus.BAD_REQUEST).send({
      message: 'Email already exists,',
    });
  }

  logger.error(err.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
};
