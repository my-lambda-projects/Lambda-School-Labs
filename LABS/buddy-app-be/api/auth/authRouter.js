const express = require("express");
const router = express.Router();
const Auth = require("./auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const {
  validateUser,
  validateNewUser,
  checkExistingUser
} = require("./authMiddleware");

// user logins with email and password
router.post("/signin", validateUser, (req, res) => {
  const user = req.body;

  //find database user by inputted email
  Auth.getUserByEmail(user.email)
    .then(loggedInUser => {
      //compare user inputted password with database user's password
      if (
        loggedInUser &&
        bcrypt.compareSync(user.password, loggedInUser.password)
      ) {
        //generate a token for auth
        const token = jwt.sign(
          { email: loggedInUser.email },
          secrets.jwtSecret,
          {
            expiresIn: "1d"
          }
        );
        res.status(200).json({
          token: token,
          first_name: loggedInUser.first_name,
          last_name: loggedInUser.last_name,
          id: loggedInUser.id
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post("/signup", validateNewUser, checkExistingUser, (req, res) => {
  let user = req.body;
  //hash user's password
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  Auth.addUser(user)
    .then(newUser => {
      //generate a token for auth
      const token = jwt.sign({ email: newUser.email }, secrets.jwtSecret, {
        expiresIn: "1d"
      });
      res.status(201).json({ token: token, newUser });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
