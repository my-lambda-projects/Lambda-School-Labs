const express = require('express');
const router = express.Router();;

const db = require('../models/landingPageModel');

// get featured projects
router.get('/projects', function (req, res) {
  db.getPopularProjects()
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: 'Projects not found.' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/makers', function (req, res) {
  db.getPopularMakers()
    .then(maker => {
      if (maker) {
        res.status(200).json(maker);
      } else {
        res.status(404).json({ error: 'Makers not found.' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/reviewers', function (req, res) {
  db.getPopularReviewers()
    .then(reviewer => {
      if (reviewer) {
        res.status(200).json(reviewer);
      } else {
        res.status(404).json({ error: 'Reviewers not found.' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;