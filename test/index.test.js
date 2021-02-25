const fs = require('fs');
const rmdir = require('rimraf').sync;

describe('API Endpoint Tests', () => {
  before(() => {
    const { IMG_PATH } = require('../src/util/settings');
    if (!fs.existsSync(IMG_PATH)){
      fs.mkdirSync(IMG_PATH);
    }
  });

  require('./endpoints/users.post.test');
  require('./endpoints/users.userId.get.test');
  require('./endpoints/login.post.test');
  require('./endpoints/postings.post.test');
  require('./endpoints/postings.get.test');
  require('./endpoints/postings.postingId.images.post.test');
  require('./endpoints/postings.postingId.images.get.test');
  require('./endpoints/postings.postingId.images.imageId.get.test');
  require('./endpoints/postings.postingId.images.imageId.delete.test');
  require('./endpoints/postings.postingId.get.test');
  require('./endpoints/postings.postingId.put.test');
  require('./endpoints/postings.postingId.patch.test');
  require('./endpoints/postings.postingId.delete.test');

  after(() => {
    const { IMG_PATH } = require('../src/util/settings');
    if (fs.existsSync(IMG_PATH)){
      rmdir(IMG_PATH);
    }
  });
});
