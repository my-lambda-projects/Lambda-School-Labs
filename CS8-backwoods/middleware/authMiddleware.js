const jwt = require('jsonwebtoken');

const user = require('../models/user');
const secret = require('../config');

const authenticate = (req, res, next) => {
  const token = req.get('authorization');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({ Error: 'No token provided' });
  }
};

module.exports = authenticate;
