'use strict';
module.exports = (sequelize, DataTypes) => {

  // do not need id fields because these get generated automatically with the relationship definition
  var user_collection_image = sequelize.define('user_collection_image', {
  }, {});
  user_collection_image.associate = function(models) {
    // associations can be defined here
  };
  return user_collection_image;
};
