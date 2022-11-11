import sinon from 'sinon';
import { expect } from 'chai';

import User from '../../src/models/user';
import * as authUtils from '../../src/utils/auth';
import * as authService from '../../src/services/auth';

const authResponse = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: {
    id: 1,
    email: 'hello@gmail.com',
    created_at: new Date(),
    updated_at: new Date(),
  },
};

const signUpResponse = {
  id: 1,
  email: 'hello@gmail.com',
  created_at: new Date(),
  updated_at: new Date(),
};

const authData = {
  email: 'hello@gmail.com',
  password: 'hello123',
};

describe('Auth Service tests', () => {
  it('should sign up user', async () => {
    sinon.stub(User, 'create').returns(signUpResponse);

    const response = await authService.signUp(authData);

    expect(response).to.be.an('object');
    expect(response.user).to.be.an('object');
    expect(response.user.id).to.be.an('number');
    expect(response.user.password).to.be.undefined;
  });

  it('should sign in user', async () => {
    sinon.stub(User, 'getByEmail').returns(authResponse.user);
    sinon.stub(authUtils, 'comparePassword').returns(true);
    sinon.stub(authUtils, 'getSignedTokens').returns(authResponse);

    const response = await authService.signIn(authData);

    expect(response).to.be.an('object');
    expect(response.accessToken).to.be.an('string');
    expect(response.refreshToken).to.be.an('string');
    expect(response.user).to.be.an('object');
    expect(response.user.id).to.be.an('number');
    expect(response.user.password).to.be.undefined;
  });
});
