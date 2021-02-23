'use strict'
const path = require('path');
const { storeImage } = require('../util/images')

module.exports.funcpostingspostingIdimagesPARAMETERS = function funcpostingspostingIdimagesPARAMETERS(req, res, next) {
  res.send({
    message: 'This is the mockup controller for funcpostingspostingIdimagesPARAMETERS'
  });
};

module.exports.getpostingspostingIdimages = function getpostingspostingIdimages(req, res, next) {
  res.send({
    message: 'This is the mockup controller for getpostingspostingIdimages'
  });
};

module.exports.postpostingspostingIdimages = function postpostingspostingIdimages(req, res, next) {
  if (req.rawBody) {
    try {
      storeImage(req.rawBody, path.join(process.cwd(), 'resell-images')).then(imageId => {
        res.send({ id: imageId });
      });
    } catch (error) {
      res.status(400).send({ errorCode: 'E400', errorMessage: 'There was a problem processing your image.' });
    }
  } else {
    res.status(400).send({ errorCode: 'E400', errorMessage: 'No image in body found.' });
  }
};