'use strict'

var varusersuserIdController = require('./usersuserIdControllerService');

module.exports.funcusersuserIdPARAMETERS = function funcusersuserIdPARAMETERS(req, res, next) {
  varusersuserIdController.funcusersuserIdPARAMETERS(req.swagger.params, res, next);
};

module.exports.getusersuserId = function getusersuserId(req, res, next) {
  varusersuserIdController.getusersuserId(req.swagger.params, res, next);
};