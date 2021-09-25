const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);
const Image = require("../db/models/image")(db, Sequelize);
//Database initializers, used to make queries ^

User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'});

const collection = (req, res) => {
  const { email } = req.params;
  User.findOne({ where: { email: email } }).then(user => {
    if(!user) {
      return res.status(422).json({error: 'No user with that email found'});
    }
    else {
      user.getCollectionImages().then(images => {;
        res.status(200).json(images);
      }).catch(err => {
        res.status(500).json(err);
      });
    }
  }).catch(err => res.status(500).json(err))
}

module.exports = {
  collection
}; //Exports the collection controller to be used in routes
