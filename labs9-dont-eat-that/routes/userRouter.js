const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

// get all users
router.get('/all', async (req, res) => {
  try {
    const users = await db('users'); // getting all users
    const usersPlus = await Promise.all(
      users.map(async user => {
        // mapping over users
        const allergies = await db('allergies') // adding allergies to mapped user
          .join('users-allergies', 'allergies.id', 'users-allergies.allergy_id')
          .join('users', 'users.id', 'users-allergies.user_id')
          .where({ 'users.id': user.id })
          .select('allergies.name');
        const recipes = await db('recipes') // adding recipes to mapped user
          .where({ user_id: user.id })
          .select('id', 'name', 'description');
        return { ...user, allergies: allergies, recipes: recipes };
      })
    );
    console.log(usersPlus);
    res.status(200).json(usersPlus);
  } catch (err) {
    res.status(500).json({ message: 'Users could not be retrieved.' });
  }
});

// get user by id
router.get('/one/:id', async (req, res) => {
  try {
    const firebaseid = req.params.id;
    const user = await db('users')
      .where({ firebaseid })
      .first();
    if (user) {
      const allergies = await db('allergies')
        .join('users-allergies', 'allergies.id', 'users-allergies.allergy_id')
        .join('users', 'users.id', 'users-allergies.user_id')
        .where({ 'users.id': user.id })
        .select('allergies.name');
      const recipes = await db('recipes')
        .where({ user_id: user.id })
        .select('id', 'name', 'description');
        res.status(200).json({ ...user, allergies, recipes });
    } else {
      res.status(400).json({ message: 'User does not exist in the database.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'User could not be retrieved.' });
  }
});

// router.post("/create-new-user")
router.post('/create', async (req, res) => {
  const { firebaseid } = req.body;
  try {
    if (firebaseid) {
      const userSearch = await db('users') // checking if user already in database
        .where({ firebaseid })
        .first();
      if (userSearch === undefined) {
        // if user doesn't already exist, create user
        const user = await db('users')
          .insert({ firebaseid })
          .returning('id');
        res.status(201).json(user);
      } else {
        res.status(400).json({ message: 'User already exists in database.' });
      }
    } else {
      res.status(400).json({ message: 'Please provide all fields.' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem with creating user.',
      err
    });
  }
});

module.exports = router;
