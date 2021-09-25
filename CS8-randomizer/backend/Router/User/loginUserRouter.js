const express = require("express");
const router = express.Router();
const User = require("../../Schemas/User.js");

// Libraries:

const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");

const secret = "no size limit on tokens"; // TODO: HIDE THIS IN PRODUCTION

// Make Token:

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    username: user.username,
    iat: timestamp
  };

  const options = { expiresIn: "300000" }; // 300,000 milliseconds or 5 minutes
  return jwt.sign(payload, secret, options);
}

// Local Strategy:

const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    console.log("BELLOBELLOBELLO");
    console.log("user in localStrategy (updateUserRouter.js):", user);
    console.log("username in localStrategy (updateUserRouter.js):", username);
    console.log("password in localStrategy (updateUserRouter.js):", password);
    if (err) {
      done(err);
    } else if (user) {
      user.verifyPassword(password, function(err, isValid) {
        if (err) {
          return done(err);
        }
        if (isValid) {
          const { _id, username } = user;
          return done(null, { _id, username });
        }
        return done(null, false);
      });
    } else {
      return done(null, false);
    }
  });
});

passport.use(localStrategy);

const authenticate = passport.authenticate("local", { session: false });

// Endpoint:

router.post("/", authenticate, (req, res) => {
  console.log("TEQ.USER", req.user);
  res.json({
    success: `${req.user.username}, you are logged in!`,
    token: makeToken(req.user),
    user: req.user
  });
});

module.exports = router;
