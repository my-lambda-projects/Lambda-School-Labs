const configureStripe = require("stripe");

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.STRIPELIVE
    : "sk_test_M5WmuM2g6M4eDaPQjqfDXtU3";

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
