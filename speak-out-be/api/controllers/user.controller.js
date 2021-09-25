const bcrypt = require('bcrypt');
const { catchAsync } = require('../utils/catchAsync');

const Users = require('../models/user.model');

const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll();
  return res.status(200).json(users);
});

const findUserById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const users = await Users.findById(id);
  return res.status(200).json(users);
});

const findAllStudentsByUserId = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const students = await Users.findAllByUserId(id);
  return res.status(200).json(students);
});

const updateUser = (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  if (!id || !userData.name || !userData.email) {
    res.status(404).json({ message: 'Missing required user data or id' });
  } else {
    Users.findById(id)
      .then(found => {
        if (!found) {
          res.status(400).json({ message: "That user doesn't exist!" });
        } else {
          Users.update(id, userData)
            .then(user => {
              res.status(200).json({ message: 'User data was updated!', userData });
            })
            .catch(err => {
              res.status(500).json({ message: 'Error updating user', err });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Oops, we broke', err });
      });
  }
};

module.exports = { findAllUsers, findUserById, findAllStudentsByUserId, updateUser };
