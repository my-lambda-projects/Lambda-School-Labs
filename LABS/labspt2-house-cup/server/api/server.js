const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const { User, School, House } = require('../Models');
const sequelize = require('../sequelize');

School.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
User.hasMany(School, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

House.belongsTo(School, {
  foreignKey: 'schoolId',
  onDelete: 'CASCADE'
});
School.hasMany(House, {
  foreignKey: 'schoolId',
  onDelete: 'CASCADE'
});

// user.getSchools()
// user.createSchool()

/*
  source.methodName(target, options)

  belongsTo
    it adds a foreignKey in the source model

  hasOne
    it adds a foreignKey to the target model

  hasMany
    it adds a foreignKey to the target model

  belongsToMany
*/
// const corsOptions = {
//   credentials: true,
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };



sequelize.sync();
const userRouter = require('../controllers/routes/users_routes');
const schoolsRouter = require('../controllers/routes/schools');
const housesRouter = require('../controllers/routes/houses');
const paymentRouter = require('../controllers/routes/payment');
const { errorHandler } = require('../middleware/index');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(helmet());
server.use(logger('tiny'));
server.use(cors());

server.use('/users', userRouter);

server.use('/schools', schoolsRouter);
// Get the id from req.params -- > houses.js
server.use('/', housesRouter);
server.use('/', paymentRouter);


server.get('/', (req, res) => {
  res.send(`Server is up and running now.`);
});

// server.use(errorHandler);

module.exports = {
  server,
};
