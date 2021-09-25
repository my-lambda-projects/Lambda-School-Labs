const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/users');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
// const keys = require('./keys');

function makeToken(user) {
  const timestamp = new Date().getTime();

  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
  };
  const options = {
    expiresIn: 1000 * 60 * 60 * 24, // 24 hour expiration.
  };

  return jwt.sign(payload, process.env.SECRET, options);
}
// This is Authorization this uses the username/pass to login
const localStrategy = new LocalStrategy(function(username, password, done) {
  // console.log(username, password);
  User.findOne({ username }, function(err, user) {
    // console.log(`user: ${user.checkpassword}`);
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.checkPassword(password, (err, valid) => {
      // console.log(valid);
      if (err) {
        return done(err);
      }

      if (valid) {
        const { _id, username } = user;
        return done(null, { _id, username });
      }
      return done(null, false);
    });
  });
});
// Bearer is where it pulls token from
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('jwt'),
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  // jwtFromRequest: ExtractJwt.fromUrlQueryParameter(),
  secretOrKey: process.env.SECRET,
};

// This is the restricted middleware. This uses jwt
const jwtStrategy = new JwtStrategy(jwtOptions, function(load, done) {
  // console.log(req);
  // console.log(jwtOptions, 'jwtOptions');
  // console.log(load, 'load');
  User.findById(load.sub)
    .select('-password')
    .populate('invoices')
    .then(user => {
      // console.log(load.exp - new Date().getTime());
      // console.log(user);
      if (user && load.exp - new Date().getTime() >= 0) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      console.log(err);
      done(err, false);
    });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const authenticate = passport.authenticate('local', { session: false });
const restricted = passport.authenticate('jwt', { session: false });

module.exports = { authenticate, restricted, makeToken };
