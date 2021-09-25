const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 
//Database initializers, used to make queries ^
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const signin = (req, res) => {
  const {email, password} = req.body;
  User.findOne({ where: { email: email } }).then(user => {
    if(!user) {
      return res.status(422).json({error: 'No user with that email found'});
    }
    else {
      if (user.authenticate(password)) {
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '24h' });
        return res.status(200).json({token});
      } else {
        res.status(422).json({error: 'Invalid password'});
      }
    }
  }).catch(err => console.log(err))
}

module.exports = {
  signin
}; //Exports the signin controller to be used in routes