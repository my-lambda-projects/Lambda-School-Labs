const express = require('express');
const router = express.Router();

//schema
const Class = require('../../Schemas/Class.js');

router.post('/', (req, res) => {
  const boat = req.body;
  console.log('REQ.BODY', req.body)
  console.log(boat)
  Class.create(boat)
    .then(boat => res.status(201).json('Saved new class'))
    .catch(error => res.status(500).json(`Error from server: ${error}`));
});

module.exports = router;
