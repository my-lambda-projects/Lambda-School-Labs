const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Card', CardSchema);
