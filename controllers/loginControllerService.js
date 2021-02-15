'use strict'

module.exports.postlogin = function postlogin(req, res, next) {
  res.send({
    message: 'This is the mockup controller for postlogin'
  });
};