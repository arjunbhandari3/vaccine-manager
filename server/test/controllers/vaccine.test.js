import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';
import config from '../../src/config/config';

const url = '/api/vaccines';

let token = config.token.testAccessToken;

const vaccineData = {
  name: 'Vaccine 1',
  description: 'Vaccine 1 desc',
  numberOfDoses: 2,
  manufacturer: 'ABC Company',
  releaseDate: '2022-10-16T18:15:00.000Z',
  expirationDate: '2022-10-17T18:15:00.000Z',
  photoUrl: null,
  isMandatory: true,
  allergies: '[{"risk":"High","allergy":"Allergy 1"},{"risk":"Low","allergy":"Allergy 2"}]',
};

const updateData = {
  id: 1,
  name: 'Vaccine 1',
  description: 'Vaccine 1 desc',
  numberOfDoses: 1,
  manufacturer: 'ABC Company',
  releaseDate: '2022-10-16T18:15:00.000Z',
  expirationDate: '2022-10-17T18:15:00.000Z',
  photoUrl: null,
  isMandatory: true,
  allergies: '[{"risk":"High","allergy":"Allergy 1"}]',
};

/**
 * Tests for '/api/auth'.
 */
describe('Vaccine API Test', () => {
  before(async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: 'test@gmail.com',
      password: 'test123',
    });
    token = res.body.accessToken;
  });

  it('should create new vaccine', async () => {
    const res = await request(app).post(`${url}`).set('Authorization', `Bearer ${token}`).send(vaccineData);

    expect(res.status).to.equal(201);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.be.an('string');
    expect(res.body.isMandatory).to.be.an('boolean');
  });

  it('should get all vaccines', async () => {
    const res = await request(app).get(`${url}`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get vaccine by id', async () => {
    const res = await request(app).get(`${url}/1`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.be.an('string');
  });

  it('should update vaccine', async () => {
    const res = await request(app).put(`${url}/1`).set('Authorization', `Bearer ${token}`).send(updateData);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.be.an('string');
    expect(res.body.isMandatory).to.be.an('boolean');
  });

  it('should delete vaccine', async () => {
    const res = await request(app).delete(`${url}/3`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.be.an('string');
    expect(res.body.isMandatory).to.be.an('boolean');
  });
});
