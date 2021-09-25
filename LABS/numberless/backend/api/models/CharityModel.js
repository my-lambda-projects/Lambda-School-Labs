const mongoose = require('mongoose');

const CharitySchema = new mongoose.Schema({
  charity: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  winner: {
    type: Boolean,
  },
  active: {
    type: Boolean,
  },
  votes: {
    type: Number,
  }
});

module.exports = mongoose.model('Charity', CharitySchema);