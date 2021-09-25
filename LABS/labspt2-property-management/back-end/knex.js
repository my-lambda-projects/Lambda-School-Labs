require('dotenv').config();
const knex = require('knex');
const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[environment];

module.exports = knex(config);
