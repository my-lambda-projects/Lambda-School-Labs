const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('users', {
  // firstName: { type: Sequelize.STRING, allowNull: false },
  user_id: {type:Sequelize.STRING, allowNull:false, unique: true},
  name: { type: Sequelize.STRING, allowNull: true },
  email: { type: Sequelize.STRING, allowNull: true },
  // password: { type: Sequelize.STRING, allowNull: false },
  isAdmin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
});

/*
  knex('users').select('firstName')

  users = User.findAll()
*/