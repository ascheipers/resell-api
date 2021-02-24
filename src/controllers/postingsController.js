'use strict'

const verifyToken = require('../middleware/verifyToken');

var varpostingsController = require('./postingsControllerService');

module.exports.getpostings = function getpostings(req, res, next) {
  varpostingsController.getpostings(req.swagger.params, res, next);
};

module.exports.postpostings = function postpostings(req, res, next) {
  verifyToken(req, res, varpostingsController.postpostings);
};