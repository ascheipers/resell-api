'use strict'

const models = require('../../models');

module.exports.postusers = function postusers(req, res, next) {
  const userData = req.undefined.value;

  models.User.create(userData).then(user => {
    res.send(user);
  });
};