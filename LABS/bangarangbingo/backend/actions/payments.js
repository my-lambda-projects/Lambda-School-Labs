const stripe = require('stripe')(process.env.STRIPE_KEY);

const productID = 'prod_CiXEzh3YehtKPg';
const planID = 'plan_CiXHqMVHOOztnp';

const PaymentActions = {
  async handleCharge({ customerID, numCardsOrdered }) {
    try {
      const charge = await stripe.charges.create({
        amount: numCardsOrdered * 99,
        currency: 'usd',
        description: `Bought ${numCardsOrdered} awesome cards`,
        customer: customerID,
      });
      return true;
    } catch (e) {
      return false;
    }
  },
  async handleSubscription({ customerID }, token) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerID,
        items: [{ plan: 'plan_CiXHqMVHOOztnp', quantity: 1 }],
      });
      return true;
    } catch (e) {
      return false;
    }
  },
};


module.exports = PaymentActions;


// const product = await stripe.products.create({
//   name: 'BangarangBingo Subscription 30 Day',
//   type: 'service',
// });
// const plan = await stripe.plans.create({
//   product: 'prod_CiXEzh3YehtKPg',
//   nickname: '30 Day Bingo USD',
//   currency: 'usd',
//   interval: 'month',
//   amount: 1000,
// });
