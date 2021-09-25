// Update with your config settings.
require('dotenv').config()

module.exports = {
//SQLite is for development. Using this just to start out.
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/labs9.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {directory: './data/seeds'}

  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    // connection: {
    //   database: process.env.DATABASE_URL
    //   // user:     process.env.DB_USER,
    //   // password: process.env.DB_PASSWORD
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    }
  }

};
