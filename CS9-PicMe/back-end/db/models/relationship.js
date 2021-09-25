'use strict';
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    requester_id: DataTypes.INTEGER,
    requestee_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    action_user_id: DataTypes.INTEGER
  }, {
    tableName: 'Relationships'
  });

  Relationship.associate = function(models) {
    // associations can be defined here
  };

  return Relationship;
};


