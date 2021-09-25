const stripe = require('stripe')('sk_test_QAkzeAsF7YJpHPkmR2WvVd8v');
const User = require('../models/userModel');

const billing = (req, res) => {
  const { token, email, subscribe } = req.body;

  User.findOne({ email })
    .then(user => {
      if (subscribe) {
        if (user.stripeCustomerID === 'none') {
          stripe.customers
            .create({
              email,
              description: `Monthly Membership for: ${email} `,
              source: 'tok_visa' // obtained with Stripe.js
            })
            .then(stripeCustomer => {
              stripe.subscriptions
                .create({
                  customer: stripeCustomer.id,
                  items: [
                    {
                      plan: 'plan_DCWMn3KADasiSl'
                    }
                  ]
                })
                .then(subConfirmation => {
                  User.findOneAndUpdate(
                    { email },
                    {
                      isMember: true,
                      stripeCustomerID: stripeCustomer.id
                    }
                  )
                    .then(updatedUser => {
                      res.json({ msg: 'Subsctiption Created.' });
                    })
                    .catch(err => {
                      res.json({ msg: 'Error updating User information' });
                    });
                })
                .catch(err => {
                  res.json({ msg: 'Error creating Subscription' });
                });
            })
            .catch(err => {
              res.status(400);
              res.json({ msg: 'Error creating Stripe Customer' });
            });
        } else {
          if (user.isMember) {
            res.json({ msg: 'User is already a member.' });
          } else {
            stripe.subscriptions
              .create({
                customer: stripeCustomer.id,
                items: [
                  {
                    plan: 'plan_D8IejHcFjlsg5E'
                  }
                ]
              })
              .then(subConfirmation => {
                User.findOneAndUpdate(
                  { email },
                  {
                    isMember: true
                  }
                )
                  .then(updatedUser => {
                    res.json({ msg: 'Subsctiption Created.' });
                  })
                  .catch(err => {
                    res.json({ msg: 'Error updating User information' });
                  });
              })
              .catch(err => {
                res.json({ msg: 'Error creating subscription' });
              });
          }
        }
      } else {
        stripe.charges
          .create({
            amount: 199,
            currency: 'usd',
            source: 'tok_visa'
          })
          .then(chargeConfirm => {
            User.findOneAndUpdate({ email }, { $inc: { singleDecisions: 1 } })
              .then(user => {
                res.status(200);
                res.json({ msg: 'Single Decision added' });
              })
              .catch(err => {
                res.status(400);
                res.json({ msg: 'Error Updating User' });
              });
          })
          .catch(err => {
            res.status(400);
            res.json({ msg: 'Error with Stripe Charge' });
          });
      }
    })
    .catch(err => {
      res.status(400);
      res.json({ msg: 'Error finding user.' });
    });
};

module.exports = {
  billing
};
