const dbEngine = process.env.DB || "development";

const knexConfig = require("../knexfile.js")[dbEngine];

module.exports = require("knex")(knexConfig);
