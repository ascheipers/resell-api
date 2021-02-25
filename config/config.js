const { DB_HOST, DB_USERNAME, DB_PASSWORD } = require('../src/util/settings');

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "resell_dev",
    "host": DB_HOST,
    "dialect": "postgres",
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "resell_test",
    "host": DB_HOST,
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "resell_prod",
    "host": DB_HOST,
    "dialect": "postgres"
  }
}
