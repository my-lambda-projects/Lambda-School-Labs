const router = require('express').Router();
const Users = require('./usersModel.js');
const authenticate = require('../../../api/server.js');



router.get('/allusers',(req, res) => {
        Users.findAllUsers()
          .then(users => {
            res.json(users);
            console.log(process.env.DB_ENV);
          })
          .catch(err => res.send(err));
  });

  
// router.get('/allusers',
// passport.authenticate('google', {failureRedirect: '/login'}),
//   (req, res) => {
//       Users.findAllUsers()
//         .then(users => {
//           res.json(users);
//           console.log(process.env.DB_ENV);
//         })
//         .catch(err => res.send(err));
// });


router.get('/:id', (req, res) => {
    const { id } = req.params;
    Users.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get user' });
    });
  });

router.delete('/:id', (req, res) => {
    const { id }  = req.params; 
  
    Users.removeUser(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find User with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete User' });
    });
  });

  router.post('/register', (req, res) => {

    let user = req.body;

    Users.add(user)
      .then(saved => {
        res.status(201).json({
          user: saved
          // token
        });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  

module.exports = router