const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);
const Image = require("../db/models/image")(db, Sequelize);
//Database initializers, used to make queries ^

const uploads = (req, res) => {
  const { email } = req.body;
  User.findOne({ where: { email: email } }).then(user => {
    if(!user) {
      return res.status(422).json({error: 'No user with that email found'});
    }
    else {
      Image.findAll({ where: { uploaded_image_user_id: user.id }})
      .then(imgs => res.status(200).json(imgs))
      .catch(err => res.status(500).json(err));
    }
  }).catch(err => console.log(err))
}

module.exports = {
  uploads
}; //Exports the uploads controller to be used in routes