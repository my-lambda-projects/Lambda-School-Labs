const jwt = require('jsonwebtoken');
const Employer = require('../models/EmployerModel');
const Employee = require('../models/EmployeeModel');

mysecret = 'authentication isnt working';

const authenticate = (req, res, next) => {
    const token = req.get('Authorization');
    console.log("token", token);
    const newToken = token.split(" ");
    if (newToken[1]) {
      jwt.verify(newToken[1], mysecret, (err, decoded) => {
        // console.log('decoded: ', decoded.username, decoded.admin);
        if (err) return res.status(422).json(err);
        console.log("admin:",decoded.admin);
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).json({
        error: 'No token provided, must be set on the Authorization Header',
      });
    }
  };

const isAdmin = (req, res, next) => {
  console.log(req.decoded);
    if (req.decoded.admin == true) {
        console.log('admin verified');
        next();
    } else {
        //return an error if the user is not an admin
        res.status(403).json({ error: 'You are not authorized to perform this operation'});
    }
};

module.exports = {
    authenticate,
    isAdmin
};