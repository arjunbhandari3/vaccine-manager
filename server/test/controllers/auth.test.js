import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

const url = '/api/auth';
const token = process.env.TEST_TOKEN;

const userData = {
  email: 'test@gmail.com',
  password: 'test123',
};

/**
 * Tests for '/api/auth'.
 */
describe('Auth Test', () => {
  it('should create new user', async () => {
    const res = await request(app).post(`${url}/signup`).send(userData);

    console.log(res.body, res.status, 'signup');
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.user).to.be.an('object');
    expect(res.body.data.accessToken).to.be.an('string');
  });

  it('should sign in user', async () => {
    const res = await request(app).post(`${url}/signin`).send(userData);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.user).to.be.an('object');
    expect(res.body.accessToken).to.be.an('string');
  });

  it('should not sign in user with wrong password', async () => {
    const res = await request(app).post(`${url}/signin`).send({
      email: 'test@gmail.com',
      password: 'test12345',
    });

    expect(res.body.error).to.equal('Invalid credentials');
  });

  it('refresh token', async () => {
    const res = await request(app).post(`${url}/token`).send({ refreshToken: token });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.accessToken).to.be.an('string');
  });
});
