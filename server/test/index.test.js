import sinon from 'sinon';
import { expect } from 'chai';

import logger from '../src/utils/logger';

describe('Logging', () => {
  it.skip('should log unhandled rejections', () => {
    const spy = sinon.spy(logger, 'error');

    Promise.reject(logger.error('Unhandled rejection'));
    expect(spy.calledWith(sinon.match(/.*Unhandled rejection.*/))).to.be.true;
  });

  it.skip('should handle uncaught exceptions', done => {
    const spy = sinon.spy(logger, 'error');

    process.on('uncaughtException', () => {
      throw new Error('Uncaught exception');
    });

    expect(spy.calledWith(sinon.match(/.*Uncaught exception.*/))).to.be.true;
    done();
  });
});
