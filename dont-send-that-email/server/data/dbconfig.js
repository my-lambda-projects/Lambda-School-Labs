// const knex = require('knex');

// const knexConfig = require('../knexfile.js');

// module.exports = knex(knexConfig.development);
const dbEngine = process.env.DB || 'development';
const knexConfig = require('../knexfile.js')[dbEngine];
module.exports = require('knex')(knexConfig);


