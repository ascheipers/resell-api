const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('GET /postings/{postingsId}', () => {
  it('should return a detailed view of a posting', async () => {
    const app = await expressApp();
    const res = await request(app)
      .get('/resell/v1/postings/' + process.env.TEST_POSTING_ID)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.id).to.match(patterns.UUIDv4);
    expect(res.body.creator).to.match(patterns.UUIDv4);
    expect(res.body.title).to.be.a('string');
    expect(res.body.description).to.be.a('string');
    expect(res.body.category).to.be.a('string');
    expect(res.body.location).to.be.an.instanceof(Object);
    expect(res.body.location).to.have.property('street');
    expect(res.body.location).to.have.property('city');
    expect(res.body.location).to.have.property('country');
    expect(res.body.images).to.be.an.instanceof(Array);
    expect(res.body.askingPrice).to.be.a('number');
    expect(res.body.deliveryType).to.be.oneOf(['shipping', 'pickup']);
    expect(res.body.createdAt).to.match(patterns.DateTime);
    expect(res.body.updatedAt).to.match(patterns.DateTime);
  });
});
