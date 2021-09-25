const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    contribution: {
      type: String,
      required: true,
    },
    link: String,
    notes: String,
  });

module.exports = mongoose.model('Contribution', contributionSchema);