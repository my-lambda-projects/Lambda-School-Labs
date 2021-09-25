module.exports = {
  development: {
    // Remote db connection, comment out and uncomment next line to use local connection.
    db: `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds147884.mlab.com:47884/pr-testing`,

    // Uncomment the line below to use local database. Comment it and uncomment above line to use remote database.
    // db: 'mongodb://localhost/pr-testing', 
    port: 5000
  },
  production: {
    db: `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds147034.mlab.com:47034/ls-admin-tools`,
    port: process.env.PORT || 5000
  }
}