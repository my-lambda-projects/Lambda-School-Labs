const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);

const currentuser = (req, res) => {
  const { email } = req.query;
  User.findOne({ where: { email: email } }).then(user => {
    if(!user) {
      return res.status(422).json({error: 'No user with that email found'});
    }
    else {
      res.status(200).json(user);
    }
  }).catch(err => res.status(500).json(err))
}

module.exports = {
  currentuser
};
