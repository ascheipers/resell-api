const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash(password) {
  const result = bcrypt.hashSync(password, saltRounds);
  return result;
}

function check(password, hash) {
  const result = bcrypt.compareSync(password, hash);
  return result;
}

exports.hash = hash;
exports.check = check;