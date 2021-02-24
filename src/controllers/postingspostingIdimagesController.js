'use strict'

const verifyToken = require('../middleware/verifyToken');

var varpostingspostingIdimagesController = require('./postingspostingIdimagesControllerService');

module.exports.funcpostingspostingIdimagesPARAMETERS = function funcpostingspostingIdimagesPARAMETERS(req, res, next) {
  verifyToken(req, res, varpostingspostingIdimagesController.funcpostingspostingIdimagesPARAMETERS);
};

module.exports.getpostingspostingIdimages = function getpostingspostingIdimages(req, res, next) {
  verifyToken(req, res, varpostingspostingIdimagesController.getpostingspostingIdimages);
};

module.exports.postpostingspostingIdimages = function postpostingspostingIdimages(req, res, next) {
  var data = Buffer.from('');
  req.on('data', function(chunk) {
      data = Buffer.concat([data, chunk]);
  });
  req.on('end', function() {
    if (data.length > 0) {
      req.rawBody = data;
    }
    verifyToken(req, res, varpostingspostingIdimagesController.postpostingspostingIdimages);
  });
};