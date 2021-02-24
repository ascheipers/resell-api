'use strict'

const models = require('../../models');

module.exports.postusers = function postusers(req, res, next) {
  const userData = req.undefined.value;

  models.User.create(userData).then(user => {
    res.send(user);
  }).catch(error => {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ errorCode: 'E401', errorMessage: 'Alias or email already in use.' });
    } else {
      res.status(400).send({ errorCode: 'E400', errorMessage: 'Something went wrong when creating a new user.' });
    }
  });
};