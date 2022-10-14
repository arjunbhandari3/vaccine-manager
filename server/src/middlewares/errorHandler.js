import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  err.message = err.message || 'Internal Server Error';

  logger.error(err);
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
