const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('POST /login', () => {
  it('should allow an user to login', async () => {
    const loginData = {
      alias: 'andi',
      password: '1234',
    }
  
    const app = await expressApp();
    const res = await request(app)
      .post('/resell/v1/login')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.token).to.match(patterns.JsonWebToken);
    process.env.TEST_API_TOKEN = 'Bearer ' + res.body.token;
  });

  it('should not allow an unauthorized user to login', async () => {
    const loginData = {
      alias: 'andi',
      password: 'not the password',
    }

    const app = await expressApp();
    const res = await request(app)
      .post('/resell/v1/login')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body).to.deep.equal({ errorCode: 'E400', errorMessage: 'Invalid password.' });
  });

  it('should not allow a non-existing user to login', async () => {
    const loginData = {
      alias: 'does-not-exist',
      password: '1234',
    }

    const app = await expressApp();
    const res = await request(app)
      .post('/resell/v1/login')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body).to.deep.equal({ errorCode: 'E400', errorMessage: 'Something went wrong when logging in.' });
  });
  
});
