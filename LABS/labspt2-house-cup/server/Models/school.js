const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('school', {
  name: { type: Sequelize.STRING, allowNull: false },
  city: { type: Sequelize.STRING },
  // description: {type: Sequelize.STRING},
  userId: { type: Sequelize.BIGINT, allowNull: false, onDelete: 'CASCADE' },
});
