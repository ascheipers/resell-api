'use strict'

const verifyToken = require('../middleware/verifyToken');

var varpostingspostingIdimagesimageIdController = require('./postingspostingIdimagesimageIdControllerService');

module.exports.funcpostingspostingIdimagesimageIdPARAMETERS = function funcpostingspostingIdimagesimageIdPARAMETERS(req, res, next) {
  verifyToken(req, res, varpostingspostingIdimagesimageIdController.funcpostingspostingIdimagesimageIdPARAMETERS);
};

module.exports.getpostingspostingIdimagesimageId = function getpostingspostingIdimagesimageId(req, res, next) {
  varpostingspostingIdimagesimageIdController.getpostingspostingIdimagesimageId(req.swagger.params, res, next);
};

module.exports.deletepostingspostingIdimagesimageId = function deletepostingspostingIdimagesimageId(req, res, next) {
  verifyToken(req, res, varpostingspostingIdimagesimageIdController.deletepostingspostingIdimagesimageId);
};