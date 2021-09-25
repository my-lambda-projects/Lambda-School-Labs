const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const authConfig = require('../user/authConfig');
const userModel = require('../db/userModel/userModel');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function makeANiceEmail(text) {
  return `
  <div className="email" style="
  border:1px solid black;
  padding:20px;
  font-family: sans-serif;
  line-height:2;
  font-size:20px;
  ">
  <h2>Hello There!</h2>
  <p>${text}</p>
  </div>
  `;
}

router.post('/yearly', authConfig.isLoggedIn, async (req, res) => {
  const [user] = req.user;
  const { token } = req.query;
  const response = await stripe.charges.create({
    amount: 999,
    source: token,
    currency: 'usd',
    description: 'Yearly Subscription Charge'
  });
  user.subscription = Date.now() + 1000 * 60 * 60 * 24 * 30 * 12;
  await userModel.updateUser(user.id, user);
  const msg = {
    to: user.email,
    from: 'bonafind@biz.com',
    subject: 'Bonafind Billing',
    text: 'Sent from labs 9 Business Review',
    html: makeANiceEmail(
      `Congratulations! You are now signed up for a year long subscription to Bonafind!
      
      Thanks For your support,

      - Team Bonafind
      `
    )
  };
  await sgMail.send(msg);
  res.json({ response });
});

router.post('/monthly', authConfig.isLoggedIn, async (req, res) => {
  const [user] = req.user;
  const { token } = req.query;
  const response = await stripe.charges.create({
    amount: 99,
    source: token,
    currency: 'usd',
    description: 'Monthly Subscription Charge'
  });
  user.subscription = Date.now() + 1000 * 60 * 60 * 24 * 30;
  await userModel.updateUser(user.id, user);
  const msg = {
    to: user.email,
    from: 'bonafind@biz.com',
    subject: 'Bonafind Billing',
    text: 'Sent from labs 9 Business Review',
    html: makeANiceEmail(
      `Congratulations! You are now signed up for a month long subscription to Bonafind!
      
      Thanks For your support,

      - Team Bonafind
      `
    )
  };
  await sgMail.send(msg);
  res.json({ response });
});

module.exports = router;
