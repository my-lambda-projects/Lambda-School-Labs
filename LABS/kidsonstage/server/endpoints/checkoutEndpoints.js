const express = require('express');

const checkoutRouter = express.Router();

const db = require('../config/db.js');

const stripe = require('stripe')(process.env.STRIPE_SECRET);

checkoutRouter.post('/events/:eventId', function(req, res) {
  console.log('checkout starting...');
  const { token } = req.body;
  const { eventId } = req.params;
  // const { eventId } = req.params;

  const amount = '1995';
  
  if (!token) return res.json({ err: 'Payment Failed' });
  stripe.charges.create(
    {
      amount: amount,
      currency: 'usd',
      description: 'KidsOnStage',
      source: token
    },
    (err, charge) => {
      if (err) return res.json({ err: 'Payment Failed', error: err });
      charge.eventId = eventId;
      res.send(charge);
    }
  );
});

module.exports = checkoutRouter;
