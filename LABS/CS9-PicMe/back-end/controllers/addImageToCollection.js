const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);
const Image = require("../db/models/image")(db, Sequelize);

User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});

const addImageToCollection = (req, res) => {
  const { email, imageIds } = req.body;

  User.findOne({ where: { email: email} })
    .then(user => {
      if (!user) {
        return res.status(422).json({error: 'The specified user does not exist'});
      } else {
        user.addCollectionImage(imageIds)
          .then( response => {
            user.credits -= imageIds.length 
            user.save().then();

            res.status(200).json({
              Message: `Image(s) successfully added to your collection, and ${imageIds.length} credit(s) debited.`, // 
              credits: user.credits 
            })
          })
          .catch(err => console.log(err));
      }
    }).catch(err => console.log(err))
}

// Export addImageToCollection controller
module.exports = {
  addImageToCollection
};
