const express = require('express');
const passport = require('passport');
const populateUser = require('../middlewares/populateUser');
const db = require('../data/dbconfig.js');
const router = express.Router();

// Beginning of login flow. Sends user to Auth0 to authenticate
router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect(process.env.FRONT_END_URL);
});

// Auth0 will redirect the user-agent here after authentication
// This route will redirect to the client homepage (or possibly client document list)
router.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ err, user, info });
    }

    // Initialize a session for the user on the back end
    // Subsequent requests from the user will have a `req.user` object
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      // Verifying if user exist in database, if not in database then it'll add user.
      db('users').where('emailaddress', user.emails[0].value).then((dbuser) => {
        if (dbuser.length === 0) {
          if (!user.username) {
            user.username = user.nickname;
          }
          db('users')
            .insert({
              username: user.username,
              emailaddress: user.emails[0].value,
            })
            .then(() => res.redirect(process.env.FRONT_END_URL))
            .catch((err) => {
              throw err;
            });
        } else {
          res.redirect(process.env.FRONT_END_URL);
        }
      });
    });
  })(req, res, next);
});

// Provides information about the user to the client app, which can then
// determine what content to show the user
router.get('/profile', populateUser, (req, res) => {
  const data = {};
  if (req.user) {
    data.user = req.user;
  } else {
    data.err = 'No available user session.';
  }
  res.json(data);
});

module.exports = router;
