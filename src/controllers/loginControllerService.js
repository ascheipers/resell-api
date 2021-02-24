'use strict'

const jwt = require('jsonwebtoken');
const { check } = require('../util/hash');
const models = require('../../models');
const { JWT_SECRET } = require('../util/settings');

function login(loginData, user){
  const passwordIsValid = check(loginData.password, user.password);

  if (!passwordIsValid) {
    throw 'Invalid password.'
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  });

  return token;
}

module.exports.postlogin = function postlogin(req, res, next) {
  const loginData = req.undefined.value;

  try {
    if ('alias' in loginData) {
      models.User.findOne({ where: { alias: loginData.alias }}).then(user => {
        const token = login(loginData, user);
        res.send({ token });
      })
    } else if ('email' in loginData) {
      models.User.findOne({ where: { email: loginData.email }}).then(user => {
        const token = login(loginData, user);
        res.send({ token });
      })
    } else {
      throw 'Have to provide either alias or email to login.'
    }
  } catch (error) {
    res.status(400).send({ errorCode: 'E400', errorMessage: error });
  }
};