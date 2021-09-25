const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mySecret = process.env.SECRET || 'random';
const stripe = require('stripe')(process.env.STRIPE_KEY);

const createUser = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const newUser = new User({
      email,
      password,
      jobslist: [
        { id: 1, status: 'Want to Apply', jobs: [] },
        { id: 2, status: 'Submitted Job App', jobs: [] },
        { id: 3, status: 'Received Response', jobs: [] },
        { id: 4, status: 'Phone Interview', jobs: [] },
        { id: 5, status: 'On Site Interview', jobs: [] },
        { id: 6, status: 'Technical Interview', jobs: [] },
        { id: 7, status: 'Offer', jobs: [] },
        { id: 8, status: 'Rejected', jobs: [] }
      ]
    });
    newUser
      .save()
      .then(user => {
        const payload = {
          email: user.email
        };
        const token = jwt.sign(payload, mySecret.toString());
        res.json({
          token
        });
      })
      .catch(err => {
        res.status(422).send(err);
      });
  } else {
    res.status(422).send('Please send a valid username and password');
  }
};

const changePassword = async (req, res) => {
  // - get token, old password, and new password from the request
  const { token, oldPassword, newPassword } = req.body;
  //- use jwt.verify to find email
  const storedPayload = await jwt.verify(token, mySecret);
  const email = storedPayload.email;
  //- find user using email
  User.findOne(
    {
      email
    },
    (err, user) => {
      if (err) {
        res.status(403).json({
          error: 'Invalid Email/Password'
        });
        return;
      }
      if (user === null) {
        res.status(422).json({
          error: 'No user with that email in our records'
        });
        return;
      }
      //- - make sure that the current password matches old password (got code from login controller)
      user.checkPassword(oldPassword, (nonMatch, hashMatch) => {
        if (nonMatch !== null) {
          res.status(422).json({
            error: 'old password does not match our stored password'
          });
          return;
        }
        //- - if matches, change password to the new password
        if (hashMatch) {
          bcrypt.hash(newPassword, 11, (err, hash) => {
            User.findOneAndUpdate(
              {
                email
              },
              {
                password: hash
              },
              {
                new: true
              }
            )
              .then(user => res.status(200).send(user))
              .catch(err => {
                res.status(422).json({
                  error: 'error updating password',
                  err
                });
              });
          });
        }
      });
    }
  );
};

const changeEmail = (req, res) => {
  let { oldEmail, newEmail, token } = req.body;
  oldEmail = oldEmail.toLowerCase();
  if (token === null) {
    res.status(422).json({
      msg: `You must login as ${oldEmail} to make these changes.`,
      devmsg: 'No token provided'
    });
  } else {
    jwt.verify(token, mySecret, (err, decoded) => {
      if (err) {
        res.status(422).json({
          msg: `You must login as ${oldEmail} to make these changes.`,
          devmsg:
            'Token provided does not match email you are attempting to change',
          err
        });
      } else {
        if (decoded.email === oldEmail) {
          User.findOneAndUpdate(
            {
              email: oldEmail
            },
            {
              email: newEmail
            },
            {
              new: true
            }
          )
            .then(user => {
              token = jwt.sign({ email: newEmail }, mySecret.toString());
              if (user.stripeCustomerID !== 'none') {
                stripe.customers
                  .update(user.stripeCustomerID, {
                    email: user.email
                  })
                  .then(updatedUser => {
                    res
                      .status(200)
                      .json({ msg: 'Succesfully updated email', user, token });
                  })
                  .catch(err => {
                    res.status(422).json({
                      msg: 'Error updating email',
                      devmsg: 'Error updating Stripe Customer account',
                      err
                    });
                  });
              } else {
                res
                  .status(200)
                  .json({ msg: 'Succesfully updated email.', user, token });
              }
            })
            .catch(err => {
              res.status(500).json({
                msg: 'Error updating Email, please contact support',
                devmsg: 'Error updating MongoDB',
                err
              });
            });
        } else {
          res.status(422).json({
            msg: `You must login as ${oldEmail} to make these changes.`,
            devmsg: 'Token does not match email provided.',
            err
          });
        }
      }
    });
  }
};

module.exports = {
  createUser,
  changePassword,
  changeEmail
};
