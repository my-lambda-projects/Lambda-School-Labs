const User = require('../../models/users');

const updateStripeInfo = (req, res) => {
  const { stripe } = req.body;
  const { _id } = req.user;

  if (!stripe || !stripe.code || !stripe.scope) {
    return res.status(422).json({ message: 'Stripe info required.' });
  }

  User.findByIdAndUpdate(_id, { stripe }, { new: true })
    .select('-password')
    .populate('invoices')
    .then(response => res.json({ user: response }))
    .catch(err => res.status(500).json(err));
};

module.exports = { updateStripeInfo };
