// JWT strategy here to work along passport
const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const User = require("../models/user");
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETKEY
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  // Find the user via id that's inside the payload
  User.findById(payload.sub)
    // remove password field from selection to not display it
    .select("-password")
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err =>
      // handle error
      done(err, false)
    );
});

// it will protect future routes from unauthorized access if included as middleware
const protected = passport.authenticate("jwt", { session: false });

module.exports = { jwtStrategy, protected };
