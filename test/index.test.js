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
  require('./endpoints/login.post.test');
  require('./endpoints/postings.post.test');
  require('./endpoints/postings.get.test');

  after(() => {
    const { IMG_PATH } = require('../src/util/settings');
    if (fs.existsSync(IMG_PATH)){
      rmdir(IMG_PATH);
    }
  });
});
