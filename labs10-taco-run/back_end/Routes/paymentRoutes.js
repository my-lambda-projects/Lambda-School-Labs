/* This is where the billing API endpoint will go (Stripe Feature) */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // --> initialize stripe
const express = require("express"); // --> intialize express and express router
const router = express.Router();
const db = require("../config.js");

require("dotenv").config(); // --> use the .env file
router.use(require("body-parser").text()); // --> add body-parser for stripe


router.post('', (req, res) => {
  let amount = 500

  stripe.customers
    .create({
      email: req.body.email,
      card: req.body.id,
      source: 'tok_visa',
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Sample Charge',
        currency: 'usd',
        customer: customer.id,
      })
    )
    .then(charge => res.send(charge))
    .catch(err => {
      console.log('Error:', err)
      res.status(500).send({ error: 'Purchase Failed' })
    })
})

module.exports = router;