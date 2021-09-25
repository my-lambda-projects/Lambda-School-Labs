const User = require("../models/user");
const validateRegisterInput = require("../../validation/register");

// Validates user registration and then creates new user
const createUser = (req, res) => {
  const myNewUser = new User(req.body);

  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  myNewUser
    .save()
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports = createUser;
