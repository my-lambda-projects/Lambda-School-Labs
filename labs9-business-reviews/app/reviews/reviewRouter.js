const express = require('express');
const router = express.Router();
const authConfig = require('../user/authConfig');

const db = require('../db/dbinit');

async function addReviewChecks(req, res, next) {
  const [user] = req.user;
  const userReviews = await db('reviews').where({ reviewer_id: user.id });
  if (!user.subcription && userReviews.length >= 3) {
    return res.json({
      message: 'Your 3 free reviews are up. Please purchase a subscription'
    });
  }
  if (user.subscription < Date.now() && user.subscription) {
    return res.json({
      message: 'Your Subscription is expired or invalid please renew!'
    });
  }
  return next();
}

//CREATE
router.post('/', authConfig.isLoggedIn, addReviewChecks, (req, res) => {
  const [user] = req.user;
  req.body.reviewer_id = user.id;
  const review = req.body;
  db('reviews')
    .insert(review)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//GET ALL
router.get('/', (req, res) => {
  db('reviews')
    .then(review => {
      res.status(200).json(review);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//GET BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('reviews')
    .where({ id })
    .then(review => {
      res.status(200).json(review);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
//PUT
router.put('/:id', authConfig.isLoggedIn, (req, res) => {
  const [user] = req.user;
  const changes = req.body;
  const { id } = req.params;
  if (changes.reviewer_id !== user.id)
    return res.json({ message: 'Not your review bounce' });

  db('reviews')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});
//DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('reviews')
    .where({ id })
    .del()
    .then(count =>
      count
        ? res.status(200).json({ message: 'Deleted' })
        : res.status(404).json({ message: 'Could not find that review' })
    )
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
