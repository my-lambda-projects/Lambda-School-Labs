const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PerformanceSchema = Schema({
  exercise: {
    type: Schema.Types.ObjectId,
    ref: "Exercise"
  },
  exerciseName: {
    type: String
  },
  note: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  weight: {
    type: Number,
    required: true,
    default: 30
  },
  reps: {
    type: Number,
    required: true,
    default: 10
  },
  sets: {
    type: Number,
    required: true,
    default: 3
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Performance = mongoose.model("Performance", PerformanceSchema);
module.exports = Performance;
