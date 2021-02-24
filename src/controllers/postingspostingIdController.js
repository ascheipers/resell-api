'use strict'

const verifyToken = require('../middleware/verifyToken');

var varpostingspostingIdController = require('./postingspostingIdControllerService');

module.exports.funcpostingspostingIdPARAMETERS = function funcpostingspostingIdPARAMETERS(req, res, next) {
  verifyToken(req, res, varpostingspostingIdController.funcpostingspostingIdPARAMETERS);
};

module.exports.getpostingspostingId = function getpostingspostingId(req, res, next) {
  verifyToken(req, res, varpostingspostingIdController.getpostingspostingId);
};

module.exports.deletepostingspostingId = function deletepostingspostingId(req, res, next) {
  verifyToken(req, res, varpostingspostingIdController.deletepostingspostingId);
};

module.exports.putpostingspostingId = function putpostingspostingId(req, res, next) {
  verifyToken(req, res, varpostingspostingIdController.putpostingspostingId);
};

module.exports.patchpostingspostingId = function patchpostingspostingId(req, res, next) {
  verifyToken(req, res, varpostingspostingIdController.patchpostingspostingId);
};