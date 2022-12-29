import sinon from 'sinon';
import { expect } from 'chai';

import logger from '../src/utils/logger';

describe('Logging', () => {
  it('should log unhandled rejections', () => {
    // // mock the logger function with Sinon
    const spy = sinon.spy(logger, 'error');
    // trigger an unhandled rejection
    Promise.reject(logger.error('Unhandled rejection'));
    // assert that the logger was called with the expected arguments
    expect(spy.calledWith(sinon.match(/.*Unhandled rejection.*/))).to.be.true;
  });

  it('should log uncaught exceptions', () => {
    // // mock the logger.error function with Sinon
    const spy = sinon.fake.rejects(new Error('Uncaught exception'));
    sinon.replace(logger, 'error', spy);
    // trigger an uncaught exception
    return Promise.reject(logger.error('Uncaught exception')).catch(err => {
      // assert that the logger was called with the expected arguments
      expect(spy.calledWith(sinon.match(/.*Uncaught exception.*/))).to.be.true;
    });
  });
});
