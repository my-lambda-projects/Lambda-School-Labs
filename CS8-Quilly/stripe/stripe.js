const config = require('../config/config');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const StripeCustomer = require('../models/stripecustomer');

router.get('/', (req, res) => {
  const userId = req.session.userId; // The user id of the logged in user
  User.findById(userId)
    .populate({ path: 'billing' })
    .then(user => {
      console.log('hello this request was made!');
      res.status(200).send(user.billing);
    })
    .catch(error => {
      res.status(500).json({ error: 'Request could not be fulfilled', error });
    });
});

router.post('/charge', (req, res) => {
  console.log("POST /charge");
  let tok = req.body.data;
  // Create the customer
  User.findById(req.session.userId, (err, user) => {
    if (err) {
      console.log("Error in /charge findbyid");
    };
    user.setCard(tok, (err) => {
      console.log("Setting card");
      if (err) {
        console.log("Error in /charge setcard:\n" + err);
      };
      console.log(user);
      res.status(200).send(user);
    });
  });
});

module.exports = router;