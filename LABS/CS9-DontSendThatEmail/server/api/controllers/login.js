const jwt = require("jsonwebtoken");
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Create a token for particular user and send payload to JWT
const makeToken = user => {
  const payload = {
    sub: user._id,
    user: user.username,
    email: user.email,
    membership: user.membership
  };

  const options = { expiresIn: "4h" };

  // Sign the token with payload, secret key and selected options
  return jwt.sign(payload, process.env.SECRETKEY, options);
};

// This is start of usual login route that's encapsulated and will be 
// called with authenticate and login via authRouter
const localStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    // bcrypt will decrypt the passwords and compare them
    user.checkPassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) {
        // Grab user id and username and pass it to payload that will be 
        // sent to jwt to generate token only if passwords match
        const { _id, username, email, membership } = user;
        return done(null, { _id, username, email, membership });
      }
      return done(null, false);
    });
  });
});

// just passport gibberish to authenticate
const authenticate = passport.authenticate("local", { session: false });

// Whole encapsulated logic of login, returns created token as json response 
// along with username it belongs to when called via API
const login = (req, res) => {
  res.json({ token: makeToken(req.user), user: req.user });
};

// export these to use in authRouter
module.exports = { login, authenticate, localStrategy };
