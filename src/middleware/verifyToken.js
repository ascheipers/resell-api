const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../util/settings');

function verifyToken (req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw 'No authorization token provided.';
    }

    token = token.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        throw 'Unauthorized.';
      }
      req.swagger.params.userId = decoded.id;
      next(req.swagger.params, res, next);
    });
  } catch (error) {
    return res.status(400).send({ errorCode: 'E400', errorMessage: error });
  }
};

module.exports = verifyToken;
