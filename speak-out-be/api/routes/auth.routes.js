const express = require('express');
const bcrypt = require('bcrypt');
const model = require('../models/model.js');
const jwt = require('jsonwebtoken');

const {
  validateRegistration,
} = require('../middlewares/registration.middleware');
const { jwtSecret } = require('../config/secrets');

const router = express.Router();

module.exports = router;

router.post('/api/auth/login', (req, res) => {
  let { email, password } = req.body;

  model
    .findByEmail({email})
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.name}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/api/auth/register', validateRegistration, (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  model
    .addUser({
      user_type: req.body.user_type,
      password: hashedPassword,
      name: req.body.name,
      email: req.body.email,
    })
    .then(user => {
      res.status(201).json({
        message: `The user '${user[0].name}' has successfully been created!`,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: `There was an error attempting to register user: ${
          (error, message, stack)
        }.`,
      });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    name: user.name,
    user_type: user.user_type || 'user',
  };
  const options = {
    expiresIn: '3h',
  };
  return jwt.sign(payload, jwtSecret, options);
}
