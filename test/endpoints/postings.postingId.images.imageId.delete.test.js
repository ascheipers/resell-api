const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('DELETE /postings/{postingId}/images/{imageId}', () => {
  it('should delete an images of a posting', async () => {
    const app = await expressApp();
    const res = await request(app)
      .delete(`/resell/v1/postings/${process.env.TEST_POSTING_ID}/images/${process.env.TEST_IMAGE_ID}`)
      .set('Authorization', process.env.TEST_API_TOKEN)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
