const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoutineSchema = Schema({
  title: {
    type: String,
    required: true
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],
  workoutLog: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout"
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Routine = mongoose.model("Routine", RoutineSchema);
module.exports = Routine;
