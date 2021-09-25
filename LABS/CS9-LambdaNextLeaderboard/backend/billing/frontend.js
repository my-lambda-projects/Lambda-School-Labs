require('dotenv').config();
const FRONTEND_DEV_URLS = [ process.env.ReactAPP, process.env.GitHub, 'http://localhost:4000', 'https://api.huntr.co' ];

const FRONTEND_PROD_URLS = [
  process.env.APP_URL, 'http://localhost:4000', 'https://q.stripe.com', process.env.ReactAPP, process.env.GitHub, 'https://api.huntr.co'
];

module.exports = process.env.NODE_ENV === 'production'
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;
