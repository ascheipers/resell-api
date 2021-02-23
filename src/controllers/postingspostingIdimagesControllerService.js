'use strict'

const path = require('path');
const fs = require('fs');
const models = require('../../models');

async function storeImage(buffer, location, posting) {
  // TODO: verify is image

  const dbImage = models.Image.build({ posting });

  await fs.writeFile(path.join(location, dbImage.id + '.jpg'), buffer, { flag: 'wx' }, err => {
    if (err) {
      throw err;
    }
  });

  await dbImage.save();

  return dbImage.id;
}

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
      storeImage(req.rawBody, path.join(process.cwd(), 'resell-images'), req.swagger.params.postingId.value).then(imageId => {
        res.send({ id: imageId });
      });
    } catch (error) {
      res.status(400).send({ errorCode: 'E400', errorMessage: 'There was a problem processing your image.' });
    }
  } else {
    res.status(400).send({ errorCode: 'E400', errorMessage: 'No image in body found.' });
  }
};