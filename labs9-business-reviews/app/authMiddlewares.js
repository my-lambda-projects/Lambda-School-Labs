//DO NOT TOUCH MADE BY CARLO
const uuid = require('uuidv4');
const authConfig = require('./user/authConfig');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');

const sessionConfig = {
  secret: 'keyboard cat',
  resave: false,
  genid: function(req) {
    return uuid();
  },
  key: 'Bonafind',
  saveUninitialized: true,
  // cookie: { maxAge: 1000 * 60 * 60 },
  store: authConfig.store
};

module.exports = server => {
  server.use(session(sessionConfig)),
    server.use(expressValidator()),
    server.use(passport.initialize()),
    server.use(passport.session());
};
