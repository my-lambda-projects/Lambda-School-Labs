const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const { makeToken } = require('../../config/auth');

const login = (req, res) => {
  const { _id, username } = req.user;
  const tknUser = { _id, username };
  const token = makeToken(tknUser);
  User.findOne(_id)
    .select('-password -img')
    .populate('invoices')
    .then(user => {
      res.json({ token, user });
    });
};

const checkToken = (req, res) => {
  const { _id, username } = req.user;
  const tknUser = { _id, username };
  const token = makeToken(tknUser);
  User.findById(_id)
    .select('-password')
    .populate('invoices')
    .then(user => res.json({ user, token }))
    .catch(err => res.status(501).json(err));
};

module.exports = {
  login,
  checkToken,
};
