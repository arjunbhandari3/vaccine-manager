import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

const url = '/api/auth';

let tokens = {
  accessToken: null,
  refreshToken: null,
};

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

  it('should not create new user with existing email', async () => {
    const res = await request(app).post(`${url}/signup`).send(signUpBody);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('User already exists!');
  });

  it('should sign in user', async () => {
    const res = await request(app).post(`${url}/signin`).send(userData);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.user).to.be.an('object');
    expect(res.body.accessToken).to.be.an('string');

    const { accessToken, refreshToken } = res.body;
    tokens = { accessToken, refreshToken };
  });

  it('should not sign in user with wrong password', async () => {
    const res = await request(app).post(`${url}/signin`).send({
      email: 'test@gmail.com',
      password: 'test12345',
    });

    expect(res.body.message).to.equal('Invalid credentials');
  });

  it('refresh token', async () => {
    const res = await request(app).post(`${url}/token`).send({ refreshToken: tokens.refreshToken });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.accessToken).to.be.an('string');
  });

  it('should not refresh token with wrong refresh token', async () => {
    const res = await request(app).post(`${url}/token`).send({ refreshToken: 'wrongRefreshToken' });

    expect(res.status).to.equal(500);
    expect(res.body.message).to.equal('jwt malformed');
  });

  it('should sign out user', async () => {
    const res = await request(app).post(`${url}/signout`).set('Authorization', `Bearer ${tokens.accessToken}`).send({
      refreshToken: tokens.refreshToken,
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal('Signed out successfully!');
  });

  it('should not sign out user with wrong refresh token', async () => {
    const res = await request(app).post(`${url}/signout`).set('Authorization', `Bearer ${tokens.accessToken}`).send({
      refreshToken: 'wrongRefreshToken',
    });

    expect(res.status).to.equal(500);
    expect(res.body.message).to.equal('jwt malformed');
  });

  it('should not sign out user if the user is not logged in', async () => {
    const res = await request(app).post(`${url}/signout`).send({
      refreshToken: tokens.refreshToken,
    });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('No Authorization Token');
  });
});
