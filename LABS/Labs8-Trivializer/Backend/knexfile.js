// configuration file for knex, which will build our SQL queries for our database (SQL builder)
require("dotenv").config();



const localPg = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  };

  const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
    // development: {
    //     client: "sqlite3",
    //     debug: false,
    //     connection: {
    //         filename: "./data/trivializer.sqlite3",
    //         user: "admin",
    //         password: "password"
    //     },

    //     useNullAsDefault: true,
    //     pool: {
    //         min: 2,
    //         max: 10
    //     },
    //     migrations: {
    //         directory: "./data/migrations",
    //         tableName: "knex_migrations"
    //     },
    //     seeds: { directory: "./data/seeds" }
    // },
    development: {
        client: "postgresql",
        connection: `${process.env.DATABASE_URL}?ssl=true`,
        pool: {
          min: 2,
          max: 10
        },
        useNullAsDefault: true,
        migrations: {
          tableName: "knex_migrations",
          directory: "./data/migrations"
        },
        seeds: {
          directory: "./data/seeds"
        }
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    production: {
        client: "postgresql",
        connection: `${process.env.DATABASE_URL}?ssl=true`,
        useNullAsDefault: true,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./data/migrations",
            tableName: "knex_migrations"
        },
        seeds: { directory: "./data/seeds" }
    },

    // production: {
    //     client: "pg",
    //     connection: `${process.env.DATABASE_URL}?ssl=true`,
    //     pool: {
    //       min: 2,
    //       max: 10
    //     },
    //     useNullAsDefault: true,
    //     migrations: {
    //       tableName: "knex_migrations",
    //       directory: "./data/migrations"
    //     },
    //     seeds: {
    //       directory: "./data/seeds"
    //     }
    // }
};
