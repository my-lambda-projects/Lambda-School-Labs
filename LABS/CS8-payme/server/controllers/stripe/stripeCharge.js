const stripe = require('stripe')(process.env.STRIPE_SK);
// const addSub = require('./addSub');
const User = require('../../models/users');

const stripeCharge = async function(req, res) {
  try {
    // console.log(req.body);

    // If amount is $20, charge and add 30 days to sub
    if (req.body.amount === 2000) {
      let { status } = await stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        description: 'GMMM 30 day subscription',
        source: req.body.source,
      });

      const user = await addSub(req);
      console.log(new Date(user.subscription).toString());
      res.json({ status, user });

      // If amount is a multiple of $1.99, charge and add the credits to the user.
    } else if (req.body.amount % 199 === 0) {
      const credits = req.body.amount / 199;
      let { status } = await stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        description: `GMMM: ${credits} credits for ${req.body.amount}`,
        source: req.body.source,
      });
      console.log(`Adding ${credits} credits.`);
      const user = await addCredits(req, credits);
      res.json({ status, user });
    } else {
      res
        .status(422)
        .json({ message: 'Charge must be $20 or multiple of $1.99' });
    }
    // console.log('1 :', user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

async function addSub(req) {
  const { _id } = req.user;
  const currentTime = new Date().getTime();
  const subLength = 1000 * 60 * 60 * 24 * 30; // 30 days in MilliSeconds
  const rv = await User.findById(_id)
    .select('-password')
    .then(user => {
      let subscription = user.subscription;
      if (currentTime - subscription < 0) {
        subscription += subLength;
      } else {
        subscription = currentTime + subLength;
      }
      return User.findByIdAndUpdate(_id, { subscription }, { new: true })
        .select('-password')
        .populate('invoices')
        .then(user => user)
        .catch(err => err);

      // user
      //   .save()
      //   .then(response => {
      //     const ro = { ...response._doc };
      //     delete ro.password;
      //     return ro;
      //   })
      //   .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  console.log(' rv:   ', rv);
  return rv;
}

async function addCredits(req, credits) {
  const { _id } = req.user;
  const rv = await User.findById(_id)
    .select('-password')
    .then(user => {
      let { invoiceCredits } = user;
      invoiceCredits += credits;
      return User.findByIdAndUpdate(_id, { invoiceCredits }, { new: true })
        .select('-password')
        .populate('invoices')
        .then(user => user)
        .catch(err => err);
    })
    .catch(err => console.log(err));
  console.log('addedCredits: ', rv);
  return rv;
}

module.exports = { stripeCharge };
