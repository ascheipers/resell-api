'use strict'

var varpostingspostingIdimagesController = require('./postingspostingIdimagesControllerService');

module.exports.funcpostingspostingIdimagesPARAMETERS = function funcpostingspostingIdimagesPARAMETERS(req, res, next) {
  varpostingspostingIdimagesController.funcpostingspostingIdimagesPARAMETERS(req.swagger.params, res, next);
};

module.exports.getpostingspostingIdimages = function getpostingspostingIdimages(req, res, next) {
  varpostingspostingIdimagesController.getpostingspostingIdimages(req.swagger.params, res, next);
};

module.exports.postpostingspostingIdimages = function postpostingspostingIdimages(req, res, next) {
  var data = Buffer.from('');
  req.on('data', function(chunk) {
      data = Buffer.concat([data, chunk]);
  });
  req.on('end', function() {
    req.rawBody = data;
    varpostingspostingIdimagesController.postpostingspostingIdimages(req, res, next);
  });
};