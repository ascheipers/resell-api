'use strict'

const models = require('../../models');

module.exports.getpostings = function getpostings(req, res, next) {
  models.Posting.findAll().then(postings => {
    res.send(postings);
  });
};

module.exports.postpostings = function postpostings(req, res, next) {
  const postingData = req.undefined.value;
  postingData.creator = req.loggedInUser;

  models.Posting.create(postingData).then(posting => {
    res.send(posting);
  });
};