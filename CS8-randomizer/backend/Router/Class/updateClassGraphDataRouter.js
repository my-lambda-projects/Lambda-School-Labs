const express = require('express');

//schema
const Class = require('../../Schemas/Class.js');

const router = express.Router();

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Class.findById(id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .put((req, res) => {
    console.log('REQ', req.body)
    const { id } = req.params;
    const updateInfo = req.body;

    Class.findOneAndUpdate(
      { _id: id }, // First argument is the "filter"
      { graph_data: updateInfo.graph_data},
      { new: true }
    )
      .then(response => {
        response.save();
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })

module.exports = router;
