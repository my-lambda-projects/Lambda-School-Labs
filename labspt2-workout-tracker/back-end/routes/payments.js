const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

const paymentApi = server => {
  server.get('/api/payment', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    });
  });

  // This is where the post request creates a body of the token id, amount, and currency
  server.post('/api/payment', (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    };
    stripe.charges.create(body, stripeChargeCallback(res));
  });

  return server;
};

module.exports = paymentApi;
