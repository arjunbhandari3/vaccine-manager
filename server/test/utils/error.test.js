import { expect } from 'chai';

import CustomError from '../../src/utils/error';

describe('CustomError', () => {
  it('should set the message and statusCode properties', () => {
    const message = 'Error message';
    const statusCode = 400;
    const error = new CustomError(message, statusCode);
    expect(error.message).to.equal(message);
    expect(error.statusCode).to.equal(statusCode);
  });

  it('should set the status property to "fail" for 4xx status codes', () => {
    const message = 'Error message';
    const statusCode = 400;
    const error = new CustomError(message, statusCode);
    expect(error.status).to.equal('fail');
  });
});
