const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('../db/dbinit');

const store = new KnexSessionStore({
  tablename: 'sessions',
  sidfieldname: 'sid',
  knex: db,
  clearInterval: 1000 * 60 * 60 * 24,
  createtable: true
}); // defaults to a sqlite3 database

exports.store = store;
exports.isLoggedIn = isLoggedIn;
exports.checkCreds = checkCreds;
exports.alreadyLoggedIn = alreadyLoggedIn;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.json({ message: 'Need to be logged in to be able to use this feature' });
}

function alreadyLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return res.send('Already logged in y you trying to log in again');
  return next();
}

function checkCreds(req, res, next) {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req
    .checkBody('email', 'That Email is not valid')
    .notEmpty()
    .isEmail();
  req.checkBody('password', 'password cannot be blank').notEmpty();
  //   req
  //     .checkBody('password-confirm', 'password-confirm cannot be blank')
  //     .notEmpty();
  //   req
  //     .checkBody('password-confirm', 'Oops! your passwords do not match')
  //     .equals(req.body.password);
  const errors = req.validationErrors(); //check all of the validations if there is a error
  const errorMessages = [];
  if (errors) {
    errors.map(err => errorMessages.push(err.msg));
  }
  if (errorMessages.length > 0) return res.json({ errorMessages });
  next();
}
