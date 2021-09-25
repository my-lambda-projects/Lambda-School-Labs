const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');

passport.use(
  new FacebookStrategy(
    {
      callbackURL: '/auth/facebook/callback',
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET_KEY,
      profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
      const { first_name, last_name, email, id } = profile._json;
      const currentUser = await User.findOne(
        { email },
        'email name facebookId'
      );
      if (currentUser) {
        return done(null, currentUser);
      }
      const newUser = await new User({
        email,
        name: `${first_name} ${last_name}`,
        facebookId: id
      }).save();
      return done(null, newUser);
    }
  )
);
