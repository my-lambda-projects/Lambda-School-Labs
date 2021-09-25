const stripe = require("../constants/stripe");
const router = require("express").Router();
const User = require("../models/user");
const { login, authenticate, localStrategy } = require("../controllers/login");
const { protected, jwtStrategy } = require("../jwt/jwt");

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.get("/", (req, res) => {
  res.send({
    message: "Hello Stripe checkout server!",
    timestamp: new Date().toISOString()
  });
});

router.post("/", protected, (req, res, next) => {
  // stripe.charges.create(req.body, postStripeCharge(res));
  const stripeToken = req.body.source;
  let email = req.user.email;

  // Stripe is checking if user already exists when creating subscription
  // Stripe needs to be enabled on both front/back end to work properly
  User.findById(req.user._id)
    .then(user => {
      if (user.membership)
        res.status(400).json({ message: "You're already a member!" });
      else {
        stripe.customers.create(
          {
            email: email,
            source: stripeToken
          },
          (err, customer) => {
            if (err) res.status(400).json("Unable to create a user");
            else {
              const { id } = customer;
              stripe.subscriptions.create(
                {
                  customer: id,
                  items: [
                    {
                      plan: "plan_DSy8ZhexFZTG2z"
                    }
                  ]
                },
                (err, subscription) => {
                  if (err) res.status(400).json("Unable to subscribe");
                  else {
                    user.subscription = subscription.id;
                    user.membership = true;
                    user.save();
                    res.status(200).json({ message: "Subscription successful" });
                  }
                }
              );
            }
          }
        );
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
