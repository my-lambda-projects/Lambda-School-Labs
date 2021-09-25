const fs = require('fs');
const mongoose = require("mongoose");

let savedUsers = null;

const User = require('../models/userModels.js');

const readUsers = () => {
  // cache users after reading them once
  if (!savedUsers) {
    const contents = fs.readFileSync('user-seed-data.json', 'utf8');
    savedUsers = JSON.parse(contents);
  }
  return savedUsers;
};

const populateUsers = () => {
  const users = readUsers();
  for (user in users) {
    // Note, _id should have 24 hex characters.
    user._id = new mongoose.Types.ObjectId(user._id);
  }
  const promises = users.map(p => new User(p).save());
  return Promise.all(promises);
};

populateUsers().then(() => {
  console.log("finished adding rows.");
});

module.exports = { readUsers, populateUsers };
