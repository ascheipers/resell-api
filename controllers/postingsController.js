'use strict'

var varpostingsController = require('./postingsControllerService');

module.exports.getpostings = function getpostings(req, res, next) {
  varpostingsController.getpostings(req.swagger.params, res, next);
};

module.exports.postpostings = function postpostings(req, res, next) {
  varpostingsController.postpostings(req.swagger.params, res, next);
};