'use strict'

const path = require('path');
const fs = require('fs');
const models = require('../../models');
const { IMG_PATH } = require('../util/settings');

module.exports.funcpostingspostingIdimagesimageIdPARAMETERS = function funcpostingspostingIdimagesimageIdPARAMETERS(req, res, next) {
  res.send({
    message: 'This is the mockup controller for funcpostingspostingIdimagesimageIdPARAMETERS'
  });
};

module.exports.getpostingspostingIdimagesimageId = function getpostingspostingIdimagesimageId(req, res, next) {
  const imageId = req.imageId.value;

  models.Image.findByPk(imageId).then(result => {
    if (result === null) {
      res.status(400).send({ errorCode: 'E404', errorMessage: 'Image not found.' });
    } else {
      res.send(result);
    }
  });
};

module.exports.deletepostingspostingIdimagesimageId = function deletepostingspostingIdimagesimageId(req, res, next) {
  const imageId = req.imageId.value;

  models.Image.findByPk(imageId).then(result => {
    try {
      if (result === null) {
        throw 'Image not found.'
      } else {
        result.getPosting().then(posting => {
          if (posting.creator === req.loggedInUser) {
            result.destroy().then(() => {
              fs.unlinkSync(path.join(IMG_PATH, result.id + '.jpg'));
              res.send();
            });
          } else {
            throw 'You are not the posting belonging to this image and thus can not delete it.'
          }
        });
      }
    } catch (error) {
      res.status(400).send({ errorCode: 'E404', errorMessage: error });
    }
  });
};