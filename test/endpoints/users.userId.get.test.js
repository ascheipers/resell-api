const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('GET /users/{userId}', () => {
  const userData = {
    alias: 'andi',
    firstName: 'Andreas',
    lastName: 'Scheipers',
    email: 'andreas@scheipe.rs',
    address: {
        street: 'Tutkijantie 2',
        city: 'Oulu',
        country: 'Finnland'
    },
    password: '1234',
    profilePicture: 'data:image/jpeg;base64,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'
  }

  it('should return an user', async () => {
    const app = await expressApp();
    const res = await request(app)
      .get('/resell/v1/users/' + process.env.TEST_USER_ID)
      .send(userData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.id).to.match(patterns.UUIDv4);
    expect(res.body.address).to.deep.equal(userData.address);
    expect(res.body.alias).to.equal(userData.alias);
    expect(res.body.firstName).to.equal(userData.firstName);
    expect(res.body.lastName).to.equal(userData.lastName);
    expect(res.body.email).to.equal(userData.email);
    expect(res.body.profilePicture).to.equal(userData.profilePicture);
    expect(res.body.createdAt).to.match(patterns.DateTime);
    expect(res.body.updatedAt).to.match(patterns.DateTime);
  });
});
