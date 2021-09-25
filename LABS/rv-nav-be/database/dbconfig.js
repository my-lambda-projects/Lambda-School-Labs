const knex = require('knex')

const knexconfig = require('../knexfile.js')

const env = process.env.DB_ENV || "development"

module.exports = knex(knexconfig[env])