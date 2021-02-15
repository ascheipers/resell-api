'use strict'

var varloginController = require('./loginControllerService');

module.exports.postlogin = function postlogin(req, res, next) {
  varloginController.postlogin(req.swagger.params, res, next);
};