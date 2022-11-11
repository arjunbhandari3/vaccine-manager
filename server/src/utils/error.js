/**
 * Error Response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
