const passport = require('passport');

/* strategies / providers */
const localStrategy = require('./providers/local');
const twitterStrategy = require('./providers/twitter');
// const googleStrategy = require('./providers/google');

/* user model */
const User = require('../users/model');

passport.use(localStrategy);
passport.use(twitterStrategy);
// passport.use(googleStrategy);

/* sessions */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
