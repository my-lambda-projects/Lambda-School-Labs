const Auth = require("./auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

module.exports = {
  validateUser,
  validateNewUser,
  checkExistingUser,
  jwtauth
};

function validateUser(req, res, next) {
  const user = req.body;
  Auth.getUserByEmail(user.email).then(returnedUser => {
    if (returnedUser) {
      console.log(user);
      if (bcrypt.compareSync(user.password, returnedUser.password)) {
        next();
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  });
}

function validateNewUser(req, res, next) {
  const user = req.body;

  if (!user.first_name) {
    res.status(400).json({ message: "Please provide a first name" });
  } else if (!user.password) {
    res.status(400).json({ message: "Please provide a password" });
  } else if (!user.email) {
    res.status(400).json({ message: "Please provide an email" });
  } else if (!user.location) {
    res.status(400).json({ message: "Please provide a zip code" });
  } else if (!user.last_name) {
    res.status(400).json({ message: "Please provide a last name" });
  } else {
    next();
  }
}

function checkExistingUser(req, res, next) {
  const user = req.body;

  Auth.getUserByEmail(user.email)
    .then(user =>
      user
        ? res.status(400).json({
            message: `The email address ${user.email} already has an account associated.`
          })
        : next()
    )
    .catch(err => res.status(500).json({ error: err }));
}

function jwtauth(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Invalid token, please verify that you are logged in."
        });
      } else {
        req.user = { email: decodedToken.email };
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "No token provided, please verify that you are logged in."
    });
  }
}
