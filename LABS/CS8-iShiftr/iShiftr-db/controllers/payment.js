//const stripe = require('../models/PaymentModel');
const stripe = require("stripe")('sk_test_fiAgEhHfF9hOFaVwxF15EKQ2');
const Employer = require('../models/EmployerModel');
const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

const paymentApi = async (req, res) => {
  console.log(req.body);
  try {
    let { status } = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "for ishiftr",
      source: req.body.id
    });
    Employer
      .findByIdAndUpdate(req.body.id, {
        $set: {paid: true}
      })
      .then(employer => {
        console.log(employer);
        res.status(200).json(employer)
    
      })
      .catch((error) => {
        res.status(500).json({ Error: 'There was an error getting the employer', error })
      })
  }
  catch (error) {
    res.status(500).end();
  }
};

module.exports = {
  paymentApi
};


// app.post('/api/pay', requestLogin, async (req, res) => {
//   const charge = await stripe.charges.create({
//       amount: 500,
//       currency: 'usd',
//       description: '$5 for 5 credits',
//       source: req.body.id
//   });
  
//   req.user.credits += 5;
//   const user = await req.user.save();

//   res.send(user);

// });