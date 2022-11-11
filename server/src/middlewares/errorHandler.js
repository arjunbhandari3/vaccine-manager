import HttpStatus, { getReasonPhrase } from 'http-status-codes';

import logger from '../utils/logger';

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  const { statusCode, message } = err;

  if (err.code >= 23000 && err.code <= 23505) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: 'error',
      code: HttpStatus.BAD_REQUEST,
      message: getReasonPhrase(HttpStatus.BAD_REQUEST),
    });
  }

  res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    message: message || getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR),
  });

  next();
};

export default errorHandler;
