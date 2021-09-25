const express = require('express');

//schema
const Class = require('../../Schemas/Class.js');

const router = express.Router();

router.route('/').get((req, res) => {
  Class.find({})
    .populate('students users')
    .then(classes => {
      if (classes.length === 0) {
        res.status(404).json({ error: 'No classes found!' });
      } else {
        res.status(200).json(classes);
      }
    })
    .catch(error => res.status(500).json(`Error from server: ${error}`));
});


router.route('/:id')
.get((req, res) => {
  const { id } = req.params;
  Class.findById(id)
    .populate('student')
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

module.exports = router;
