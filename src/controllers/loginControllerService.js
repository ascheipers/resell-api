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

module.exports.postlogin = async function postlogin(req, res, next) {
  const loginData = req.undefined.value;
  const searchOptions = {};

  try {
    if ('alias' in loginData) {
      searchOptions.alias = loginData.alias;
    } else if ('email' in loginData) {
      searchOptions.email = loginData.email;
    } else {
      throw 'Have to provide either alias or email to login.'
    }
    const user = await models.User.findOne({ where: searchOptions });
    if (user === null) {
      throw 'Something went wrong when logging in.'
    }
    const token = login(loginData, user);
    res.send({ token, id: user.id });
  } catch (error) {
    res.status(400).send({ errorCode: 'E400', errorMessage: error });
  }
};