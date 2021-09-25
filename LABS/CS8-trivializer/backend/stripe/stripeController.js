const stripe = require('stripe')('sk_test_IarWqysVEhD12KTqDlb0OuwI');
const User = require('../users/userModel.js')

const tier1Price = 999;
const tier2Price = 2999;

const stripeCharge = async function(req, res) {
  try {
    console.log("REQ.BODY", req.body);

    if (req.body.amount === tier1Price) {
      let { status } = await stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        description: 'Paid Tier 1',
        source: req.body.source,
      });
      User.findByIdAndUpdate(req.body.userId, {user_type: "Tier 1"})
      .then(updated => {
        if (updated === undefined) {
          res.status(404).json(updated);
        } else {
          console.log("UPDATED STRIPE", updated);
          res.status(200).json(updated);
        }
      })
      .catch(err => {
        res.status(500).json("error updating user information", err);
      });
      // console.log("USER AFTER CALLING FINDBYID", user);

    } else if (req.body.amount = tier2Price) {
      let { status } = await stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        description: `Paid Tier 2`,
        source: req.body.source,
      });
      User.findByIdAndUpdate(req.body.userId, {user_type: "Tier 2"})
      .then(updated => {
        if (updated === undefined) {
          res.status(404).json(updated);
        } else {
          console.log("UPDATED STRIPE", updated);
          res.status(200).json(updated);
        }
      }).catch(err => {
        res.status(500).json("error updating user information", err);
      })
      // res.json({ status, user });
    } else {
      res
        .status(422)
        .json({ message: `Charge must be ${tier1Price} or ${tier2Price} `});
    }
    // console.log('1 :', user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { stripeCharge };




