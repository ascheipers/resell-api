'use strict'

var varusersController = require('./usersControllerService');

module.exports.postusers = function postusers(req, res, next) {
  varusersController.postusers(req.swagger.params, res, next);
};