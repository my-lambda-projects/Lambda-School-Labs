const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const bcrypt = require("bcrypt");
const User = require("../db/models/user")(db, Sequelize); 
//Database initializers, used to make queries ^

const update = (req, res) => {
  const currEmail = req.body.currEmail //will grab current email if it is being changed
  const {email, first_name, last_name, nick_names, credits} = req.body;
  let {password} = req.body;
  const userUpdate = () => {
    User.update({ email, password, first_name, last_name, nick_names, credits },
      { where: { email: currEmail }, individualHooks: true })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))
  }
  const hashPassword = () => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 8, (err, data) => {
        if (err) reject(err);
        password = data;
        resolve();
      })
    });
  }
  if (!currEmail) {
    res.status(400).json({success: false, message: 'Please include a user email.'});
  } else if (password) {
    hashPassword().then(x => userUpdate())
  } else {
    userUpdate();
  }
}

module.exports = {
  update
}; //Exports the update controller to be used in routes