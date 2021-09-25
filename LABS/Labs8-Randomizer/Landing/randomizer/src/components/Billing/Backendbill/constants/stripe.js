const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_live_fYkwjjIplBzEnfVmnILSlk4I'
    : 'sk_test_0LeWyVgnEyqIYEydrD8IXqEZ';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;