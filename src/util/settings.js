require('dotenv').config({overwrite: true});

const {
  DB_HOST = 'localhost',
  DB_USERNAME = 'resell',
  DB_PASSWORD = '',
  HOST_NAME = 'localhost',
  HOST_PORT = '8080',
  IMG_PATH = '/home/resell/images',
  IMG_PATH_TEST = '/tmp/resell-test/images',
  IMG_ROUTE = 'resell/images',
  JWT_SECRET = 'somesecretforresell',
} = process.env;

module.exports = {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  HOST_NAME,
  HOST_PORT,
  IMG_PATH: (() => {
    if (process.env.NODE_ENV === 'test') {
      return IMG_PATH_TEST;
    } else {
      return IMG_PATH
    }
  })(),
  IMG_ROUTE,
  JWT_SECRET,
}
