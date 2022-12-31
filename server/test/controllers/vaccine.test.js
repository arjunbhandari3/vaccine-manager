import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

const url = '/api/vaccines';

let token = null;

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
  manufacturer: 'XYZ Company',
  releaseDate: '2022-10-16T18:15:00.000Z',
  expirationDate: '2022-10-17T18:15:00.000Z',
  photoUrl: null,
  isMandatory: false,
  allergies: '[{"risk":"High","allergy":"Allergy 1", "id": 1},{"risk":"Low","allergy":"Allergy 4"}]',
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
    expect(res.body.allergies).to.be.an('array');
  });

  it('should not create new vaccine with empty body', async () => {
    const res = await request(app).post(`${url}`).set('Authorization', `Bearer ${token}`).send({});

    expect(res.status).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.an('string');
  });

  it('should get all vaccines', async () => {
    const res = await request(app).get(`${url}`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get vaccines by filter search and mandatory', async () => {
    const res = await request(app).get(`${url}?search=Vaccine&mandatory=false`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]?.isMandatory).to.be.false;
  });

  it('should get count of vaccines', async () => {
    const res = await request(app).get(`${url}/count`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('total', 'mandatory', 'optional');
  });

  it('should get vaccine by id', async () => {
    const res = await request(app).get(`${url}/1`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.be.an('string');
  });

  it('should not get vaccine with invalid id', async () => {
    const res = await request(app).get(`${url}/100000`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.an('string');
  });

  it('should update vaccine', async () => {
    const res = await request(app).put(`${url}/1`).set('Authorization', `Bearer ${token}`).send(updateData);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.be.an('string');
    expect(res.body.isMandatory).to.be.an('boolean');
  });

  it('should not update vaccine with invalid id', async () => {
    const res = await request(app).put(`${url}/10000`).set('Authorization', `Bearer ${token}`).send(updateData);
    expect(res.status).to.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.an('string');
  });

  it('should update mandatory status', async () => {
    const res = await request(app)
      .patch(`${url}/1`)
      .set('Authorization', `Bearer ${token}`)
      .send({ isMandatory: true });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.be.an('string');
    expect(res.body.isMandatory).to.be.an('boolean');
  });

  it('should not update mandatory status when isMandatory is null', async () => {
    const res = await request(app)
      .patch(`${url}/1`)
      .set('Authorization', `Bearer ${token}`)
      .send({ isMandatory: null });

    expect(res.status).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.an('string');
  });

  it('should delete vaccine', async () => {
    const res = await request(app).delete(`${url}/1`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.be.an('string');
    expect(res.body.isMandatory).to.be.an('boolean');
  });

  it('should not delete vaccine with invalid id', async () => {
    const res = await request(app).delete(`${url}/10000`).set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.an('string');
  });
});
