const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('house', {
  name: { type: Sequelize.STRING, allowNull: false },
  color: { type: Sequelize.STRING },
  schoolId: { type: Sequelize.BIGINT, },
  points: { type: Sequelize.INTEGER, defaultValue: 0 },
});
