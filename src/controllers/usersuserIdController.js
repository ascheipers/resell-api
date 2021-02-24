'use strict'

const verifyToken = require('../middleware/verifyToken');

var varusersuserIdController = require('./usersuserIdControllerService');

module.exports.funcusersuserIdPARAMETERS = function funcusersuserIdPARAMETERS(req, res, next) {
  verifyToken(req, res, varusersuserIdController.funcusersuserIdPARAMETERS);
};

module.exports.getusersuserId = function getusersuserId(req, res, next) {
  verifyToken(req, res, varusersuserIdController.getusersuserId);
};