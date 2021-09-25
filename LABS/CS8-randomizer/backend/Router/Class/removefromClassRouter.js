const express = require('express');

//schema
const Class = require('../../Schemas/Class.js');

const router = express.Router();

router
  .route('/:id')
  // .get((req, res) => {
  //   const { id } = req.params;
  //   Class.findById(id)
  //     .then(response => {
  //       res.json(response);
  //     })
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });
  // })
  .put((req, res) => {
    console.log('REQ', req.body)
    const { id } = req.params;
    const updateInfo = req.body;
    if (updateInfo.students){
    Class.findByIdAndUpdate(id, {
      $pull: { students: updateInfo.students }
    }, { 'new': true})
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
    }
    if (updateInfo.users){
      Class.findByIdAndUpdate(id, {
        $pull: { users: updateInfo.users }
      }, { 'new': true})
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    }
  })

module.exports = router;
