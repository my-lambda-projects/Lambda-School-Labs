const express = require('express');
const router = express.Router();

const categoryDb = require('../models/filterModel');

//Search API endpoint
router.get('/', (req, res) => {
  //get search query from URL
  const query = req.query.query;

  //check if query exists
  if (!query) {
    res.status(400).json({ message: 'Bad request' });
  }

  if (query) {
    categoryDb
      .getProjectsCategory(query)
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

module.exports = router;
