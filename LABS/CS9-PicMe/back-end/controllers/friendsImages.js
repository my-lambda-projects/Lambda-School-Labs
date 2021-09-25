const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);
const Image = require("../db/models/image")(db, Sequelize);
//Database initializers, used to make queries ^

User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'});

const friendsImages = async (req, res) => {
  const { email } = req.params;

  const currentUser = await User.findOne({ where: { email: email } });

  try {
    let images = await currentUser.friendsUploadedImages();
    const allUsers = await User.all();

    res.status(200).json({ images, allUsers });
  } catch(err) {
    res.status(500).json(err);
    console.log(`Fetch friends' images error: ${err}`);
  }

}

module.exports = {
  friendsImages
}; 

