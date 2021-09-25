//add the env variables
const dotenv = require('dotenv');

const pg = require('pg');

dotenv.load();

// console.log(typeof JSON.parse(process.env.PG_SSL))

pg.defaults.ssl = process.env.PG_SSL
	? !!JSON.parse(String(process.env.PG_SSL))
	: true;

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
module.exports = {
	development: {
		// client: 'mssql',
		// connection: {
		// 	host: 'localhost',
		// 	user: 'SA',
		// 	password: 'SqlServer2017',
		// 	database: 'TutorialDB',
		// 	options: {
		// 		port: 1433,
		// 		encrypt: true
		// 	}
		// },
		client: 'pg',
		connection: {
			host: 'localhost',
			user: 'postgres',
			database: 'postgres'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	},

	production: {
		client: 'mssql',
		connection: {
			host: dbHost,
			user: dbUser,
			password: dbPassword,
			database: dbName,
			options: {
				port: 1433,
				encrypt: true
			}
		},
		pool: {
			min: 2,
			max: 10
		},
		useNullAsDefault: true,
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	},

	heroku: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		pool: {
			min: 2,
			max: 10
		},
		useNullAsDefault: true,
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	},

	sqlite: {
		client: 'sqlite3',
		connection: {
			filename: './sqlite/db.sqlite3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './sqlite/migrations'
		},
		seeds: {
			directory: './sqlite/seeds'
		}
	}
};
