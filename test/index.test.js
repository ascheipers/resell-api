const assert = require('assert');
const should = require('chai').should();
const models = require('../models');

describe('API Endpoint Tests', () => {
  beforeEach(() => { models.sequelize.sync().then(()=>{ models.sequelize.close(); })})
  require('./users.post.test');
});
