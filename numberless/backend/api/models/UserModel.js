const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPledge: {
    type: Number,
  },
  customerID: {
    type: String,
  },
  subscriptionID: {
    type: String,
  },
  voted: {
    type: String,
  },
  admin: {
    type: Boolean
  }
});

module.exports = mongoose.model('User', UserSchema);