const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('PUT /postings/{postingsId}', () => {
  it('should update a posting', async () => {
    const newPostingData = {
      title: 'Old Laptop with Windows', // updated field
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

    const app = await expressApp();
    const res = await request(app)
      .put('/resell/v1/postings/' + process.env.TEST_POSTING_ID)
      .send(newPostingData)
      .set('Authorization', process.env.TEST_API_TOKEN)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    Object.keys(newPostingData).forEach(key => {
      expect(res.body[key]).to.not.be.undefined;
      expect(res.body[key]).to.deep.equal(newPostingData[key]);
    });
    expect(res.body.id).to.match(patterns.UUIDv4);
    expect(res.body.creator).to.match(patterns.UUIDv4);
    expect(res.body.createdAt).to.match(patterns.DateTime);
    expect(res.body.updatedAt).to.match(patterns.DateTime);
  });
});
