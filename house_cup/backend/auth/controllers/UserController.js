const jwt = require('jsonwebtoken');
const moment = require('moment');
const nodemailer = require('nodemailer');

const User = require('../models/UserModel.js');

const {
  mysecret,
  adminemail,
  adminusername,
  adminpassword,
} = process.env;


const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: adminusername,
    pass: adminpassword,
  },
});

const createUser = async (req, res) => {
  const { username } = req.body;
  const { email } = req.body;
  const { hashedPassword } = req;
  try {
    const result = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(422).json({ message: error });
  }
};
// This one is used for Settings and Reset password all in one.
const updateUserPassword = async (req, res, next) => {
  let { email } = req.body;
  const { hashedPassword } = req;
  const { username } = req.decoded;
  try {
    const user = await User.findOne({ username });
    if (!email) {
      email = user.email;
    }
    await User.update(
      { username },
      { email, passwordHash: hashedPassword, updatedAt: moment() },
    );
    req.email = email;
    next();
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req;
  const mailOptions = {
    to: email,
    from: adminemail,
    subject: 'Housecups Password Has been Changed',
    text:
      'Your Housecups email/password has been successfully changed .\n\n' +
      'Thanks Team Housecups',
  };
  try {
    await smtpTransport.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(422).json({ message: 'Email could not be sent' });
  }
};

// signin
const signin = async (req, res) => {
  const { username, isAdmin, isTeacher, isSuperAdmin, schoolID } = req;
  const payload = { username, isAdmin, isTeacher, isSuperAdmin, schoolID };
  const token = await jwt.sign(payload, mysecret);
  res.status(200).json({ token });
};

// signout
const signout = async (req, res) => {
  res.status(200).json({ success: true });
};


const forgotPassword = async (req, res, next) => {
  let { email } = req.body;
  let username = email;
  try {
    const user = await User.find().or([{ username }, { email }]);
    username = user[0].username;
    email = user[0].email;
    const { isAdmin } = user[0];
    const payload = { username, isAdmin };
    const token = await jwt.sign(payload, mysecret, { expiresIn: '2h' });
    req.email = email;
    req.username = username;
    req.token = token;
    next();
  } catch (error) {
    res.status(422).json({ message: 'No such user found' });
  }
};

// Change `http://localhost:3000/reset?${token}\n\n` url to production url in production
const sendResetEmailAndRedirect = async (req, res) => {
  const { email, token, username } = req;
  const mailOptions = {
    to: email,
    from: adminemail,
    subject: 'Housecups Password Reset',
    text:
      `Hi ${username}\n\n` +
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      `http://localhost:3000/reset?${token}\n\n` +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n\n' +
      'Thanks Team Housecups'
  };

  try {
    await smtpTransport.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(422).json({ message: 'Email could not be sent' });
  }
};

module.exports = {
  createUser,
  signin,
  signout,
  forgotPassword,
  sendResetEmailAndRedirect,
  updateUserPassword,
  sendResetPasswordEmail,
};
