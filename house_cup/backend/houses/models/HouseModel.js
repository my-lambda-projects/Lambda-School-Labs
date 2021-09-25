const mongoose = require('mongoose');

const { Schema } = mongoose;

const HouseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mascot: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  schoolID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'School',
  }, // schoolId: foreign key from the schools table
  score: {
    type: Number,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('House', HouseSchema);
