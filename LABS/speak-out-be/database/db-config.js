const environment = process.env.DB_ENV || 'production';

const knex = require('knex');

const knexConfig = require('../knexfile.js')[environment];

module.exports = knex(knexConfig);
