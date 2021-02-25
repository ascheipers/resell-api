const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('GET /postings/{postingId}/images/{imageId}', () => {
  it('should return an images of a posting', async () => {
    const app = await expressApp();
    const res = await request(app)
      .get(`/resell/v1/postings/${process.env.TEST_POSTING_ID}/images/${process.env.TEST_IMAGE_ID}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.id).to.match(patterns.UUIDv4);
    expect(res.body.posting).to.match(patterns.UUIDv4);
    expect(res.body.uri).to.match(patterns.URI);
    expect(res.body.createdAt).to.match(patterns.DateTime);
    expect(res.body.updatedAt).to.match(patterns.DateTime);
  });
});
