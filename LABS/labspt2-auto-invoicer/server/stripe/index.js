const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_CHECKOUT_SECRET_KEY);

router.post('/charge', async (req, res) => {
  try {
    const { stripeToken } = JSON.parse(req.body);
    const status = await stripe.charges.create({
      amount: 699,
      currency: 'USD',
      description: 'Purchased 1 Month Unlimited Plan!',
      source: stripeToken
    });
    res.json({ status });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
