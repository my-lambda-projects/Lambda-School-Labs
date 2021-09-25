require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = {

  connect: () => {

    // Mongo Auth Information
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;

    // Mongo DB connection URI using mLab
    const dbPath = `mongodb://${dbUser}:${dbPassword}@ds111050.mlab.com:11050/house_cup_db`;

    mongoose.connect(dbPath)
      .then(() => {
        console.log('Database is connected sucessfully');
      })
      .catch((error) => {
        console.log(error);
      });

  },

};
