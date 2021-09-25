const express = require('express');
// const router = express.Router();
const User = require('../../models/users');
// const keys = require('../../config/keys');
const { makeToken } = require('../../config/auth');

const register = (req, res) => {
  const { username, password, phone, fullName, companyName } = req.body;
  let user = {};
  if (!username || !password) {
    res.status(422).json({ message: 'Email and Password are required.' });
  } else {
    user = { username, password, phone, fullName, companyName };
  }

  User.findOne({ username }).then(response => {
    if (!response) {
      const newUser = new User(user);
      newUser
        .save()
        .then(response => {
          const token = makeToken(newUser);
          let ro = { ...response._doc };
          delete ro.password;
          res.json({ token, user: ro });
        })
        .catch(err => {
          res.status(500).json(err); // { message: 'Server Error' });
        });
    } else {
      res.status(422).json({ message: 'Email already exists.' });
    }
  });
};

module.exports = {
  register,
};
