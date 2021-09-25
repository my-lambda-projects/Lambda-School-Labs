const express = require('express');

//schema
const User = require('../../Schemas/User.js');

const router = express.Router();

router.route('/').get((req, res) => {
  User.find({})
    .populate('classes students')
    .then(users => {
      if (users.length === 0) {
        res.status(404).json({ error: 'No users found!' });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(error => res.status(500).json(`Error from server: ${error}`));
});

router.route('/:id')
.get((req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('classes student')
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

module.exports = router;
