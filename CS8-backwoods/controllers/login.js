const jwt = require('jsonwebtoken');
const models = require('../models');
const secret = require('../config');
const bcrypt = require('bcrypt');

const login = (req, res, next) => {
  models.User.findOne(
    {
      where: {
        email: req.body.email
      }
    }
  )
    .then((user) => {
      if (!user) {
        res.status(423).json({"error": "User does not exist"})
        return
      }
      bcrypt.compare(req.body.password, user.password, (err, hashMatch) => {
        if(!hashMatch) {
          res.status(422).json({"error": "Password does not match"})
          return
        }
        if (hashMatch) {
          const payload = { email: user.email };
          const token = jwt.sign(payload, secret);
          res.json({ token });
        }
      })
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = { login };
