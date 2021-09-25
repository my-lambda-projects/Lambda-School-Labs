const mongoose = require('mongoose');
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const User = require('../models/UserModel');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const createUser = (req, res) => {
  const password = req.password;
  const { 
    email,
    userPledge,
    customerID,
    subscriptionID,
    voted
    } = req.body;
  if (!email) {
    res.status(STATUS_USER_ERROR).json({ error: 'Must provide email'});
    return;
  }
  const newUser = new User({ 
    email, 
    password,
    userPledge,
    customerID,
    subscriptionID,
    voted
   });
  newUser
    .save()
    .then(createdUser => res.json(createdUser))
    .catch(err => res.status(STATUS_SERVER_ERROR).json(err))
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .select('email userPledge customerID subscriptionID voted admin')
    .exec((err, user) => {
      if (err) {
        res.status(STATUS_USER_ERROR).json({ "Could not find user: ": err});
        return;
      }
      res.json(user);
    })
};

const getAdminUsers = (req, res) => {
  User.find( { admin: 'true' }, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ "Error retrieving users": err});
      return;
    }
    res.json(users);
  })
};


const updateUser = (req, res) => {
  const { id } = req.params;
  const { vote } = req.body;
  User.findOneAndUpdate(
    { "_id": id },
    { "voted": vote }
  )
    .exec((err, user) => {
      if (err) {
        res.status(STATUS_USER_ERROR).json({ "Could not find user: ": err});
        return;
      }
      res.json(user);
    })
};

const userLogin = (req, res) => {
  res.json(req.loggedInUser);
}

const createStripeCustomer = (req, res) => {
  const customer = stripe.customers.create({
    description: req.body.description,
    source: req.body.source,
    email: req.body.email,
  });
  customer
    .then(createdCustomer => res.json(createdCustomer))
    .catch(err => res.status(500).json(err))
}

const createStripeSubscription = (req, res) => {
  const subscription = stripe.subscriptions.create({
    customer: req.body.customer,
    items: req.body.items,
  })
  subscription
    .then(createdSubscription => res.json(createdSubscription))
    .catch(err => res.status(500).json(err))
}



module.exports = {
  createUser,
  getUser,
  getAdminUsers,
  updateUser,
  userLogin,
  createStripeCustomer,
  createStripeSubscription
}