const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressSchema = Schema({
  date: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number,
    required: true
  },
  waist: {
    type: Number,
    required: true
  },
  hips: Number,
  r_arm: Number,
  l_arm: Number,
  r_leg: Number,
  l_leg: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Progress = mongoose.model("Progress", ProgressSchema);
module.exports = Progress;
