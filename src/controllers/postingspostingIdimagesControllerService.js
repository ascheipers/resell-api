'use strict'

const path = require('path');
const fs = require('fs');
const FileType = require('file-type');
const models = require('../../models');
const { IMG_PATH } = require('../util/settings');

async function storeImage(buffer, location, posting) {
  // TODO: verify is image

  const dbImage = models.Image.build({ posting });

  await fs.writeFile(path.join(location, dbImage.id + '.jpg'), buffer, { flag: 'wx' }, err => {
    if (err) {
      throw err;
    }
  });

  await dbImage.save();

  return dbImage;
}

module.exports.funcpostingspostingIdimagesPARAMETERS = function funcpostingspostingIdimagesPARAMETERS(req, res, next) {
  res.send({
    message: 'This is the mockup controller for funcpostingspostingIdimagesPARAMETERS'
  });
};

module.exports.getpostingspostingIdimages = function getpostingspostingIdimages(req, res, next) {
models.Image.findAll({ where: { 'posting': req.postingId.value }}).then(images => {
    res.send(images);
  });
};

module.exports.postpostingspostingIdimages = function postpostingspostingIdimages(req, res, next) {
  try {
    if (req.rawBody) {
      FileType.fromBuffer(req.rawBody).then(ft => {
        if (ft.mime === 'image/jpeg') {
          try {
            storeImage(req.rawBody, IMG_PATH, req.postingId.value).then(image => {
              res.send(image);
            });
          } catch (error) {
            throw'There was a problem processing your image.';
          }
        } else {
          throw 'Image must be of a JPEG.';
        }
      })
    } else {
      throw 'No image in body found.';
    }
  } catch (error) {
    res.status(400).send({ errorCode: 'E400', errorMessage: error });
  }
};