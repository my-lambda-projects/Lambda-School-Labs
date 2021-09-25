const configureStripe = require("stripe");

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? "sk_test_zxWylPmNYWnbiWQAgqvtz3Vh" //process.env.MY_SECRET_KEY doesnt work like this
    : "sk_test_zxWylPmNYWnbiWQAgqvtz3Vh";

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
