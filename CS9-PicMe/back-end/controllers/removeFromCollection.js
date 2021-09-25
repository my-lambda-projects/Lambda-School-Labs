const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);
const Image = require("../db/models/image")(db, Sequelize);

User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});

const removeFromCollection = (req, res) => {
  const { email, imageIds } = req.body;

  User.findOne({ where: { email: email} })
    .then(user => {
      if (!user) {
        return res.status(422).json({error: 'The specified user does not exist'});
      } else {
        user.removeCollectionImage(imageIds)
          .then( response => {
            res.status(200).json({ Message: `Image(s) successfully removed from your collection.` });
          })
          .catch(err => console.log(err));
      }
    }).catch(err => console.log(err))
}

// Export removeFromCollection controller
module.exports = {
  removeFromCollection
};