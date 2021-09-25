const Sequelize = require('sequelize');

let sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: './db/database.sqlite'
});

// new Sequelize('postgres://user:pass@example.com:5432/dbname');
//
// DATABASE_URL is Heroku env var
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, { 
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    }
  });
}

module.exports = sequelize;
