const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('GET /postings', () => {
  it('should return a list of postings', async () => {
    const app = await expressApp();
    const res = await request(app)
      .get('/resell/v1/postings')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(res.body).to.be.an.instanceof(Array);

    res.body.forEach(posting => {
      expect(posting.id).to.match(patterns.UUIDv4);
      expect(posting.creator).to.match(patterns.UUIDv4);
      expect(posting.title).to.be.a('string');
      expect(posting.description).to.be.a('string');
      expect(posting.category).to.be.a('string');
      expect(posting.location).to.be.an.instanceof(Object);
      expect(posting.location).to.have.property('street');
      expect(posting.location).to.have.property('city');
      expect(posting.location).to.have.property('country');
      expect(posting.images).to.be.an.instanceof(Array);
      expect(posting.askingPrice).to.be.a('number');
      expect(posting.deliveryType).to.be.oneOf(['shipping', 'pickup']);
      expect(posting.createdAt).to.match(patterns.DateTime);
      expect(posting.updatedAt).to.match(patterns.DateTime);
    });
  });
});
