const router = require('express').Router();
const stripe = require('../../billing/stripe');
const Organization = require("../../models/Organization");
require("dotenv").config();

// var stripe = require('stripe')(process.env.SECRET_KEY);
router.put('/create', function (req, res, next) {
  const token = req.body.token;
  const id = req.body.id;
  if(!token) {
    return res.send({
      success: false,
      message: 'No token',
    })
  }
  stripe.customers.create(
    {
      source: token
    },
    function(err, customer) {
      if(err) {
        console.error(err);
      } else {
        const updateObject = {
          stripeCustomerID: customer.id
        }
        const options = {
          new: true
        }
        Organization.findByIdAndUpdate(id, updateObject, options)
          .then(organization => res.status(201).json(organization))
          .catch(err => res.json(err))

        // res.send({
        //   success: true,
        //   customer: customer,
        //   customerId: customer.id,
        // });
      }
    }
  );
});  //end of create customer

router.post('/subscribe', function (req, res, next) {
  // Step 1: grab plan and coupon
  let {
    plan,
    coupon,
    stripe_customer_id
  } = req.body;

  //format
  plan = plan.toLowerCase();
  plan = plan.trim();
  coupon = coupon.toLowerCase();
  coupon = coupon.trim();

  // step 2: verify the plan
  let plans = ['standard', 'premium'];
  if(plans.indexOf(plan) == -1) {
    return res.send({
      success: false,
      message: 'Invalid plan'
    });
  }
  // step 3: grab current user info and pull out customer id
  // const customerId = 'cus_DXrzYdu7MFOV28';

  if(plan == 'standard') plan = process.env.STANDARD
  else if(plan == 'premium') plan = process.env.PREMIUM

  let params = {
    customer: stripe_customer_id,
    items: [{ plan: plan }]
  };

  if(coupon != '') {
    params.coupon = coupon;
  };

  if(coupon=='') coupon = null;
  // step 4: subscribe
  let subscription = stripe.subscriptions.create(params,
  function(err, customer) {
    if(err) {
      console.error(err);
    } else {
      res.send({
        success: true,
        message: 'You have been subscribed.'
      });
    }
  });
});



router.post('/retrieve', function (req,res, next) {
  let {
    stripe_customer_id
  } = req.body;

  stripe.customers.retrieve(
    stripe_customer_id,
    function(err, customer) {
      res.send(customer)
    }
  );
})
router.delete('/delete', function (req, res, next) {
  let {
    stripe_customer_id,
    id
  } = req.body;
  stripe.subscriptions.del(
    stripe_customer_id,
    function(err, confirmation) {
      if (confirmation) {
        // const objectToUpdate = {
        //   stripeCustomerID: null
        // };
        // const options = {
        //   new: true
        // };
        // Organization.findByIdAndUpdate(id, objectToUpdate, options)
        //   .then(organization => res.status(201).json(organization))
        //   .catch(err => res.json(err))
        res.send(confirmation)
      }
      if (err) {
        res.send(err)
      }
      // asynchronously called
    }
  );



})

module.exports = router;
