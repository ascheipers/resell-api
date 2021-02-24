'use strict'

const models = require('../../models');

module.exports.funcpostingspostingIdPARAMETERS = function funcpostingspostingIdPARAMETERS(req, res, next) {
  res.send({
    message: 'This is the mockup controller for funcpostingspostingIdPARAMETERS'
  });
};

module.exports.getpostingspostingId = function getpostingspostingId(req, res, next) {
  const postingId = req.postingId.value;

  models.Posting.findByPk(postingId).then(result => {
    if (result === null) {
      res.status(400).send({ errorCode: 'E404', errorMessage: 'Posting not found.' });
    } else {
      res.send(result);
    }
  });
};

module.exports.deletepostingspostingId = function deletepostingspostingId(req, res, next) {
  const postingId = req.postingId.value;

  models.Posting.findByPk(postingId).then(result => {
    try {
      if (result === null) {
        throw 'Posting not found.'
      } else {
        if (result.creator === req.loggedInUser) {
          result.destroy().then(() => {
            res.send();
          });
        } else {
          throw 'You are not the creator of this posting and thus can not delete it.'
        }
      }
    } catch (error) {
      res.status(400).send({ errorCode: 'E404', errorMessage: error });
    }
  });
};

module.exports.putpostingspostingId = function putpostingspostingId(req, res, next) {
  const postingId = req.postingId.value;
  const postingData = req.undefined.value;

  models.Posting.findByPk(postingId).then(result => {
    try {
      if (result === null) {
        throw 'Posting not found.'
      } else {
        if (result.creator === req.loggedInUser) {
          Object.keys(postingData).forEach(key => {
            if (key in result) {
              result[key] = postingData[key];
            }
          });
          result.save();
          res.send(result);
        } else {
          throw 'You are not the creator of this posting and thus can not delete it.'
        }
      }
    } catch (error) {
      res.status(400).send({ errorCode: 'E404', errorMessage: error });
    }
  });
};

module.exports.patchpostingspostingId = function patchpostingspostingId(req, res, next) {
  const postingId = req.postingId.value;
  const postingData = req.undefined.value;

  models.Posting.findByPk(postingId).then(result => {
    try {
      if (result === null) {
        throw 'Posting not found.'
      } else {
        if (result.creator === req.loggedInUser) {
          Object.keys(postingData).forEach(key => {
            if (key in result) {
              result[key] = postingData[key];
            }
          });
          result.save();
          res.send(result);
        } else {
          throw 'You are not the creator of this posting and thus can not delete it.'
        }
      }
    } catch (error) {
      res.status(400).send({ errorCode: 'E404', errorMessage: error });
    }
  });
};