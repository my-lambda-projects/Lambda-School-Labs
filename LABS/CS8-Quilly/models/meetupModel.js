const mongoose = require('mongoose');

const meetupSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    link: String,
    notes: String,
  });

module.exports = mongoose.model('Meetup', meetupSchema);