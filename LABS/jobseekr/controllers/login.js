const jwt = require('jsonwebtoken');
const mySecret = process.env.SECRET || "random";
const User = require('../models/userModel');

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid Email/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that email in our records' });
      return;
    }
    user.checkPassword(password, (nonMatch, hashMatch) => {
      if (nonMatch !== null) {
        res.status(422).json({ error: "passwords don't match" });
        return;
      }
      if (hashMatch) {
        const payload = { email: user.email };
        const token = jwt.sign(payload, mySecret.toString());
        res.json({ token });
      }
    });
  });
};

module.exports = login;
