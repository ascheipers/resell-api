const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('POST /postings/{postingId}/images', () => {
  it('should allow an user to upload an image for a posting', async () => {
    const app = await expressApp();

    const req = request(app).post(`/resell/v1/postings/${process.env.TEST_POSTING_ID}/images`)
      .set('Authorization', process.env.TEST_API_TOKEN)
      .set('Accept', 'application/json');
    req.type('application/octet-stream');
    req.write(fs.readFileSync(path.join(process.cwd(), 'test', 'endpoints', 'laptop.jpg')));
    const res = await req;
    expect(res.status).to.equal(200);
    expect(res.body.id).to.match(patterns.UUIDv4);
    expect(res.body.posting).to.match(patterns.UUIDv4);
    expect(res.body.uri).to.match(patterns.URI);
    expect(res.body.createdAt).to.match(patterns.DateTime);
    expect(res.body.updatedAt).to.match(patterns.DateTime);
  });

  it('should not allow unauthenticated users to create a new posting', async () => {
    const app = await expressApp();

    const req = request(app).post(`/resell/v1/postings/${process.env.TEST_POSTING_ID}/images`)
      .set('Accept', 'application/json');
    req.type('application/octet-stream');
    req.write(fs.readFileSync(path.join(process.cwd(), 'test', 'endpoints', 'laptop.jpg')));
    const res = await req;
    expect(res.status).to.equal(400);
  });
});
