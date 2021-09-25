const knex = require("knex");
const knexConfig = require("../knexfile");

require("dotenv").config();

// module.exports = knex(knexConfig.sqlite);
module.exports = knex(knexConfig[process.env.NODE_ENV || "development"]);

//added HEROKU POSGRESQL DB for testing
//module.exports = knex(knexConfig.heroku);
// -> not sure how to set up external HEROKU DB
//DATABASE_URL=heroku pg:psql postgresql-rigid-75651 --app labs8ratemydiy
