'use strict';
module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    uploaded_image_user_id: DataTypes.INTEGER
  }, {
    tableName: 'Images'
  });

  return Image;
};
