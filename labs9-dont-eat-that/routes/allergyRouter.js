const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const allergies = await db('allergies');
    res.status(200).json(allergies);
  } catch (err) {
    res.status(500).json({ message: 'Unable to get allergies at this time.' });
  }
});

// get allergies for single user
router.get('/user/:id', async (req, res) => {
  const firebaseid = req.params.id;
  try {
    const allergies = await db('allergies')
      .join('users-allergies', 'allergies.id', 'users-allergies.allergy_id')
      .join('users', 'users.id', 'users-allergies.user_id')
      .where({ 'users.firebaseid': firebaseid })
      .select('allergies.name');
    const allergiesArray = allergies.map(allergy => allergy.name);
    res.status(200).json(allergiesArray);
  } catch (err) {
    res.status(500).json({ message: 'Unable to get allergies.' });
  }
});

router.post('/create', async (req, res) => {
  const { firebaseid, allergy } = req.body;
  try {
    if (firebaseid && allergy) {
      const allergyCheck = await db('allergies') // checking if allergy already in db
        .where({ name: allergy })
        .first();
      if (allergyCheck) {
        // if allergy already in db, get user from users db and insert into db
        const user = await db('users')
          .where({ firebaseid })
          .first();
        await db('users-allergies').insert({
          user_id: user.id,
          allergy_id: allergyCheck.id
        });
        res.status(201).json(allergyCheck.id);
      } else {
        // if allergy not in db, insert, get user from users db and insert into db
        const allergyId = await db('allergies')
          .insert({ name: allergy })
          .returning('id');
        const user = await db('users')
          .where({ firebaseid })
          .first();
        await db('users-allergies').insert({
          user_id: user.id,
          allergy_id: allergyId[0]
        });
        res.status(201).json(allergyId[0]);
      }
    } else {
      res.status(422).json({
        message: 'Please provide a firebaseid and an allergy name object. '
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Unable to add allery to database.' });
  }
});

router.delete('/delete/:id/:allergy', async (req, res) => {
  const firebaseid = req.params.id;
  const allergy = req.params.allergy;
  try {
    if (firebaseid && allergy) {
      const user = await db('users')
        .where({ firebaseid })
        .first();
      const oneAllergy = await db('allergies')
        .where({ name: allergy })
        .first();
      const count = await db('users-allergies')
        .where({ allergy_id: oneAllergy.id, user_id: user.id })
        .del();
      res.status(200).json(count);
    } else {
      res.status(400).json({ message: 'Please provide all fields' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting the allergy',
      err
    });
  }
});

module.exports = router;
