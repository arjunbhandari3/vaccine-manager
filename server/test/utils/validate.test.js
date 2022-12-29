import sinon from 'sinon';
import { expect } from 'chai';

import CustomError from '../../src/utils/error';
import { validateSignInInput } from '../../src/validators/user';

describe('validate', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {};
    next = sinon.fake();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call next with no arguments if the data is valid', async () => {
    req.body = {
      email: 'test@gmail.com',
      password: 'test123',
    };
    await validateSignInInput(req, res, next);
    expect(next.called).to.be.true;
    expect(next.calledWith()).to.be.true;
  });

  it('should call next with an error if the data is invalid', async () => {
    req.body.email = 'test';
    await validateSignInInput(req, res, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWithExactly(sinon.match.instanceOf(CustomError))).to.be.true;
    expect(next.calledWithExactly(sinon.match.has('statusCode', 400))).to.be.true;
  });
});
