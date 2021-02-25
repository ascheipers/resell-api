const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');
const expressApp = require('../../src/app');
const patterns = require('../utils').patterns;

describe('DELETE /postings/{postingsId}', () => {
  it('should delete a posting', async () => {
    const app = await expressApp();
    await request(app)
      .delete('/resell/v1/postings/' + process.env.TEST_POSTING_ID)
      .set('Authorization', process.env.TEST_API_TOKEN)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
