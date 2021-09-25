// Update with your config settings.

module.exports = {

	development: {
		client: 'sqlite3',
		connection: {
      filename: './auth.db3',
      directory: './data'
		},
		useNullAsDefault: true
	},
  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    }}

};
