const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('POST /postings', () => {
  const postingData = {
      title: 'Old Laptop',
      description: 'My 10 years old laptop with Windows XP preinstalled ;)',
      category: 'electronics',
      location: {
          street: 'Tutkijantie 2',
          city: 'Oulu',
          country: 'Finnland'
      },
      askingPrice: 99999.99,
      deliveryType: 'shipping'
  }

  it('should allow an user to create a new posting', async () => {
    const app = await expressApp();
    const res = await request(app)
      .post('/resell/v1/postings')
      .send(postingData)
      .set('Authorization', process.env.TEST_API_TOKEN)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    Object.keys(postingData).forEach(key => {
      expect(res.body[key]).to.not.be.undefined;
      expect(res.body[key]).to.deep.equal(postingData[key]);
    });
    expect(res.body.id).to.match(patterns.UUIDv4);
    expect(res.body.creator).to.match(patterns.UUIDv4);
    expect(res.body.createdAt).to.match(patterns.DateTime);
    expect(res.body.updatedAt).to.match(patterns.DateTime);

    process.env.TEST_POSTING_ID = res.body.id;
  });

  it('should not allow unauthenticated users to create a new posting', async () => {
    const app = await expressApp();
    const res = await request(app)
      .post('/resell/v1/postings')
      .send(postingData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body).to.deep.equal({ errorCode: 'E400', errorMessage: 'No authorization token provided.' });
  });

  require('./images.postings.post.test');
});
