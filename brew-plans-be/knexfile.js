module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { 
      filename: './database/data.db3'
     },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/database/migrations',
      },
      
    seeds: {
        directory: __dirname + '/database/seeds',
      },
  },
};
