require('dotenv').config();

const {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  HOST_NAME,
  HOST_PORT,
  IMG_PATH,
  IMG_ROUTE,
} = process.env;

module.exports = {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  HOST_NAME,
  HOST_PORT,
  IMG_PATH,
  IMG_ROUTE,
}
