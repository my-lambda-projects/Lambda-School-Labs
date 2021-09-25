/**
   users.js
   ====================================================
   CREATED: 2018-05-16
   VERSION: 0.1.0
   TEAM: Jason Campbell, Manisha Lal, Wesley Harvey
   ABOUT: Endpoint to register new Users
   NOTES:
   ----------------------------------------------------
 */

const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');

/* Create a new User (register). */
router.post('/', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  oktaClient.createUser(newUser)
	    .then(user => {
	      res.status(201);
	      res.send(user);
	    })
	    .catch(err => {
	      res.status(400);
	      res.send(err);
	    })
});

module.exports = router;
