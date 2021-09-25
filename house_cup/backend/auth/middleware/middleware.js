const bcrypt = require('bcrypt');
const User = require('../models/UserModel.js');

const BCRYPT_COST = 11;

const STATUS_USER_ERROR = 422;
const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

// Signup Middleware. In order of execution
const validateUsername = (req, res, next) => {
  const { username } = req.body;
  if (username.length < 5) {
    return sendUserError(new Error('Your username must contain between 5 to 60 characters'), res);
  }
  next();
};

const validatePasswords = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password.length < 6) {
    return sendUserError(
      new Error('Your password must contain between 6 to 60 characters'),
      res,
    );
  }
  if (password !== confirmPassword) return sendUserError(new Error('Password and confirm password don\'t match'), res);
  next();
};


const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const valid = tester.test(email);
  if (!valid) {
    return sendUserError(new Error('Please enter a valid email id'), res);
  }
  next();
};

async function hashPassword(req, res, next) {
  // same as const hashPassword = async(req,res) =>
  const { password } = req.body;
  bcrypt.hash(password, BCRYPT_COST, (err, hash) => {
    req.hashedPassword = hash;
    next();
  });
}

// Signin Middleware.
const matchPassword = async (req, res, next) => {
  const { email, password, username } = req.body;
  if (!password) return res.status(422).json({ err: 'password required' });
  if (!email && !username) return sendUserError(new Error('Please enter either username or email'), res);
  try {
    // Gives output array of users.
    const user = await User.find().or([{ username }, { email }]);
    if (!user.length) return sendUserError(new Error('Sorry, we could not find an account with this username or email'), res);
    bcrypt.compare(password, user[0].passwordHash, (error, response) => {
      if (!response) {
        return sendUserError(new Error('Incorrect Password'), res);
      }
      req.username = user[0].username;
      req.isAdmin = user[0].isAdmin;
      req.isTeacher = user[0].isTeacher;
      req.isSuperAdmin = user[0].isSuperAdmin;
      req.schoolID = user[0].schoolID;
      next();
    });
  } catch (error) {
    return sendUserError(new Error('Internal Error', res));
  }
};
module.exports = {
  validateEmail,
  sendUserError,
  hashPassword,
  validateUsername,
  validatePasswords,
  matchPassword,
};
