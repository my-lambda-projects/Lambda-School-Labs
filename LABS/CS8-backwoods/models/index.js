const Sequelize = require('sequelize');

// connects to Heroku DB when using the Heroku deployed link or connects locally when run through
// your termial by doing yarn start in the root directory
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    }
  });
} else {
  sequelize = new Sequelize('backwoods', 'postgres', 'dbsuperuser', {
    dialect: 'postgres'
  });
}

// Test to see if we are connected to sequelize/db
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// imports the models to the database
const models = {
  User: sequelize.import('./user'),
  Trips: sequelize.import('./trips'),
  Markers: sequelize.import('./markers')
};

// Creates relationship between models. I.E A User and their Trips.
// Object.keys(models).forEach(modelName => {
//   if ('classMethods' in models[modelName].options) {
//     if ('associate' in models[modelName].options['classMethods']) {
//       models[modelName].options.classMethods.associate(models);
//     }
//   }
// });
// Object.keys(models).forEach(modelName => {
//   if (models[modelName].associate) {
//     models[modelName].associate(models);
//   }
// });

models.User.hasMany(models.Trips, { foreignKey: 'email', targetKey: 'email' });
// models.Trips.belongsTo(models.User);
models.Trips.hasMany(models.Markers);
models.Markers.belongsTo(models.Trips);
models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;
