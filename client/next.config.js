const dotenv = require('dotenv');

dotenv.config();

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    API_URL: IS_PRODUCTION ? process.env.API_URL_PROD : process.env.API_URL_DEV,
  },
  target: 'serverless'
};
