import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  const { statusCode, message } = err;

  if (err.code === '23505') {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: 'error',
      code: HttpStatus.BAD_REQUEST,
      message: 'User already exists.',
    });
  }

  res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    message: message || 'Internal Server Error',
  });

  next();
};

export default errorHandler;
