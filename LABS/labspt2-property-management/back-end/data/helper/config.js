const db = process.env.ENVIRONMENT || 'development';
const config = require('../../knexfile.js')[db];

module.exports = require('knex')(config);
