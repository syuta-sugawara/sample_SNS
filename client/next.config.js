require('dotenv').config();

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'serverless',
  env: {
    API_URL: IS_PRODUCTION ? process.env.API_URL_PROD : process.env.API_URL_DEV,
  },
};
