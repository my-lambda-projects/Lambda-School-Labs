const express = require('express');

const usersRouter = express.Router();
const requireSignIn = require('../services/passport').requireSignIn;
const getTokenForUser = require('../services/token');
const db = require('../config/db.js');

var bcrypt = require('bcrypt');
const requireAuth = require('../services/passport').requireAuth;
const saltRounds = 10;

usersRouter.get('/', requireAuth, function(req, res) {
  // /api/users/
	if (req.user.record.userClass !== 3) {
		return res.status(500).json({error: 'userClass unauthorized'});
	}

  db('users')
    .select(
      'username',
      'email',
      'phoneNumber',
      'validated',
      'byEmail',
      'byPhone'
    )
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve any users' });
    });
});

usersRouter.get('/:id', function(req, res) {
  // /api/users/:id
  const { id } = req.params;

  db('users')
    .where('id', id)
    .select(
      'username',
      'email',
      'phoneNumber',
      'validated',
      'byEmail',
      'byPhone'
    )
    .then(function(record) {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'User does not exist' });
    });
});

usersRouter.get('/class/:userClass', function(req, res) {
  const { userClass } = req.params;

  db('users')
    .where('userClass', userClass)
    .then(function(record) {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Userclass does not exist' });
    });
});

usersRouter.put('/update', function(req, res) {
  const {
    id,
    email,
    phoneNumber,
    byEmail,
    byPhone,
    password,
    newPassword
  } = req.body;

  // If both password and new password left blank - means not changing password
  if (
    (password === undefined && newPassword === undefined) ||
    (password && newPassword === undefined)
  ) {
    db('users')
      .where('id', id)
      .update({ email, phoneNumber, byEmail, byPhone })
      .then(function(record) {
        if (record) {
          res.status(200).json(record);
        } else {
          res.status(404).json(null);
        }
      })
      .catch(function(err4) {
        res.status(500).json({ error: 'Could not update the user.', err4 });
      });
    // If no password, but newPassword box, missing current password
  } else if (password === undefined && newPassword) {
    res.status(500).json({ error: 'Missing current password.' });
    // Password fields are available, next check
  } else {
    // Check if entered password matches matches hashed password
    db('users')
      .where('id', id)
      .select('password')
      .then(function(result) {
        // Checking saved hash password with user entered password
        // result[0].password is the hashed password from the db
        bcrypt.compare(password, result[0].password, function(err2, res2) {
          //if passes match hash new password
          if (res2 === true) {
            bcrypt.hash(newPassword, saltRounds, function(err3, hash) {
              // Store hash in your password DB.

              db('users')
                .where('id', id)
                .update({
                  email,
                  phoneNumber,
                  byEmail,
                  byPhone,
                  password: hash
                })
                .then(function(record) {
                  if (record) {
                    res.status(200).json(record);
                  } else {
                    res.status(404).json(null);
                  }
                })
                .catch(function(err4) {
                  res
                    .status(500)
                    .json({ error: 'Could not update the user.', err4 });
                });
            });

            // passes don't match
          } else {
            res.status(500).json({ error: 'Passwords dont match' });
          }
        });
      });
  }
});

usersRouter.get('/validated/:validated', function(req, res) {
  const { validated } = req.params;

  db('users')
    .where('validated', validated)
    .then(function(record) {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Error' });
    });
});
const signIn = (req, res) => {
  res.send({ token: getTokenForUser(req.user),  id: req.user.id, user: req.user });
};
usersRouter.post('/login', requireSignIn, signIn);

// usersRouter.post('/login', function(req, res) {
// 	const { username, password } = req.body;
// 	bcrypt.hash(password, saltRounds, function(err, hash) {
// 		db('users')
// 			.where({username: username, password: hash}).select('id')
// 			.then(id => {
// 				let user = { id };
// 				if (id) { // assume no 0 id
// 					  res.send({ token: getTokenForUser(req.user) });
// 					} else {
// 						res.status(404).json(null);
// 					}
// 			})
// 		}
// 		.catch(function(err) {
// 			res.status(500).json({ error: 'Error' });
// 		}));
// });
usersRouter.post('/newUser', function(req, res) {
  // /api/users/newUser
  const { username, password, email, phoneNumber, byEmail, byPhone } = req.body;
  const vcode = 12345678;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    db('users')
      .insert({
        username,
        password: hash,
        email,
        phoneNumber,
        vcode,
        byEmail,
        byPhone
      })
      .then(function(record) {
        if (record) {
          res.status(200).json(record);
        } else {
          res.status(404).json(null);
        }
      })
      .catch(function(err) {
        res.status(500).json({ error: 'Could not create the user.', err });
      });
  });
});

usersRouter.delete('/delete', function(req, res) {
  const { id } = req.body;

  db('users')
    .where('id', id)
    .del()
    .then(function(record) {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not delete the user.', err });
    });
});

module.exports = usersRouter;
