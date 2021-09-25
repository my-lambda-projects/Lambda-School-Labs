const FRONTEND_DEV_URLS = ["http://localhost:3000", "localhost:3000", 'http://localhost:3000'];

const FRONTEND_PROD_URLS = [
  "https://trivializer.netlify.com",
  "https://www.trivializer.netlify.com",
  "http://localhost:3000",
  "localhost:3000",
  "https://trivializer-googletest.netlify.com",
  'http://localhost:3000'
];

https: module.exports =
  process.env.NODE_ENV === "production"
    ? FRONTEND_PROD_URLS
    : FRONTEND_DEV_URLS;
