const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
const Client = require('../client/clientSchema');
const Vendor = require('../vendor/vendorSchema');

module.exports = (req, res, next) => {
  // if route is client/login, client/signup, vendor/login, or vendor/signup next();
  if (
    req.path === '/signup' ||
    req.path === '/login' ||
    req.path === '/authenticate'
  ) {
    next();
  }
  const token = req.get('token');
  const userType = req.get('userType');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      if (userType === 'client') {
        Client.findOne({ _id: decoded.userId })
          .then(client => {
            console.log('In middleware ', client);
            if (client) {
              next();
            } else {
              return res.status(422).json({ error: 'Not a valid token' });
            }
          })
          .catch(err => {
            return res.status(422).send(err);
          });
      } else {
        Vendor.findOne({ _id: decoded.userId })
          .then(vendor => {
            if (vendor) {
              next();
            } else {
              return res.status(422).json({ error: 'Not a valid token' });
            }
          })
          .catch(err => {
            return res.status(422).send(err);
          });
      }
    });
  }
};
