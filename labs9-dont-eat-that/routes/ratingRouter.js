const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// get rating for single person
router.get('/one/:firebaseid/:recipeid', async (req, res) => {
  const { recipeid, firebaseid } = req.params;
  try {
    const user = await db('users')
      .where({ firebaseid })
      .first();
    const rating = await db('ratings')
      .where({ user_id: user.id, recipe_id: recipeid })
      .first();
    res.status(200).json(rating);
  } catch (err) {
    res.status(500).json({ message: 'Unable to retrive ratings for recipe.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { firebaseid, recipeid, newRating } = req.body;
    if (firebaseid && recipeid && newRating) {
      const user = await db('users') // gets user from db for his/her id later
        .where({ firebaseid })
        .first();
      const ratingCheck = await db('ratings') // checking to see if user gave a rating for this recipe already
        .where({ user_id: user.id, recipe_id: recipeid })
        .first();
      if (ratingCheck) {
        const ratingid = await db('ratings') // updating rating is already one
          .where({ user_id: user.id, recipe_id: recipeid })
          .update({ rating: newRating })
          .returning('id');
        res.status(200).json({ ratingid: ratingid[0], userid: user.id });
      } else {
        const ratingid = await db('ratings') // creating a rating is there's none
          .insert({
            rating: newRating,
            user_id: user.id,
            recipe_id: recipeid
          })
          .returning('id');
        res.status(201).json({ ratingid: ratingid[0], userid: user.id });
      }
    }
    res.status(400).json({ message: 'Please provide all fields.' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Unable to post a rating for this recipe.' });
  }
});

module.exports = router;
