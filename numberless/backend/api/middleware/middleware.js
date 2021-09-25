const bcrypt = require ('bcrypt');
const User = require('../models/UserModel');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const BCRYPT_COST = 11;

const hashPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(STATUS_USER_ERROR).json({ error: 'No password provided to hash'});
    return;
  }
  bcrypt
    .hash(password, BCRYPT_COST)
    .then((pass) => {
      req.password = pass;
      next();
    })
    .catch((err) => {
      res.status(STATUS_SERVER_ERROR).json({ error: {err}});
    })
};

const authenticate = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide email to authenticate'});
    return;
  }
  User.findOne({ email }, (err, user) => {
    if (err || user === null) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'Unable to find user to authenticate' });
      return;
    }
    const hashedPass = user.password;
    bcrypt
      .compare(password, hashedPass)
      .then((response) => {
        if (!response) res.status(STATUS_SERVER_ERROR).json({ error: 'No response from auth server' });
          req.loggedInUser = user;
          next();
        })
        .catch((err) => {
          res.status(STATUS_SERVER_ERROR).json({ error: {err} });
            return;
          });
      });
};

module.exports = {
    hashPassword,
    authenticate
};