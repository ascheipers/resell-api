'use strict'
const models = require('../../models');

module.exports.funcusersuserIdPARAMETERS = function funcusersuserIdPARAMETERS(req, res, next) {
  res.send({
    message: 'This is the mockup controller for funcusersuserIdPARAMETERS'
  });
};

module.exports.getusersuserId = function getusersuserId(req, res, next) {
  const userId = req.userId.value;

  models.User.findByPk(userId).then(result => {
    if (result === null) {
      res.status(400).send({ errorCode: 'E404', errorMessage: 'User not found.' });
    } else {
      res.send(result);
    }
  });
};