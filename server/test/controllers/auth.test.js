import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';
import config from '../../src/config/config';

const url = '/api/auth';
let token = config.token.testAccessToken;

//generate random email
const email = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@gmail.com';

const userData = {
  email: 'test1@gmail.com',
  password: 'test123',
};

const signUpBody = {
  ...userData,
  email,
  name: 'Test User',
};

/**
 * Tests for '/api/auth'.
 */
describe('Auth Test', () => {
  it('should create new user', async () => {
    const res = await request(app).post(`${url}/signup`).send(signUpBody);

    expect(res.status).to.equal(201);
    expect(res.body).to.be.an('object');
    expect(res.body.user).to.be.an('object');
  });

  it('should sign in user', async () => {
    const res = await request(app).post(`${url}/signin`).send(userData);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.user).to.be.an('object');
    expect(res.body.accessToken).to.be.an('string');
    token = res.body.refreshToken;
  });

  it('should not sign in user with wrong password', async () => {
    const res = await request(app).post(`${url}/signin`).send({
      email: 'test@gmail.com',
      password: 'test12345',
    });

    expect(res.body.message).to.equal('Invalid credentials');
  });

  it('refresh token', async () => {
    const res = await request(app).post(`${url}/token`).send({ refreshToken: token });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.accessToken).to.be.an('string');
  });
});
