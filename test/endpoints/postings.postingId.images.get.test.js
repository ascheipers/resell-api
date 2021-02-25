const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('GET /postings/{postingId}/images', () => {
  it('should return a list of images of a posting', async () => {
    const app = await expressApp();
    const res = await request(app)
      .get(`/resell/v1/postings/${process.env.TEST_POSTING_ID}/images`)
      .set('Authorization', process.env.TEST_API_TOKEN)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.be.an.instanceof(Array);

    res.body.forEach(image => {
      expect(image.id).to.match(patterns.UUIDv4);
      expect(image.posting).to.match(patterns.UUIDv4);
      expect(image.uri).to.match(patterns.URI);
      expect(image.createdAt).to.match(patterns.DateTime);
      expect(image.updatedAt).to.match(patterns.DateTime);
    });
  });
});
