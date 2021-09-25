// const stripe = require('stripe')('sk_test_H5m1BImFjTdc7oLig2dKoq5A');

// const customer = await stripe.customers.create({
//   email: 'customer@example.com'
// });
const stripe = require('stripe')('sk_test_H5m1BImFjTdc7oLig2dKoq5A');

const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.use(express.json());

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
      res.status(500).send({ error: stripeErr });
  } else {
    console.log('works');
    res.status(200).send({ success: stripeRes });
  }
}

router.post('/charge', (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res));
});


router.get('/charges', (req, res) => {

  stripe.charges.list(
    {limit: 3},
    function(err, charges) {

      // Do something with the returned values
        res.status(200).json(charges.data)
    }
  )
});

module.exports = router;
  