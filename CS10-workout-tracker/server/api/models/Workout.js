const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  routine: {
    type: Schema.Types.ObjectId,
    ref: "Routine",
    required: true
  },
  routineName: {
    /* routineName is used to display the titles on the calendar. 
    Previously the titles were being retrieved from the routine doc, but routineName
    safeguards against errors that arise when the user deletes any routine(s) */
    type: String
  },
  performances: [
    {
      type: Schema.Types.ObjectId,
      ref: "Performance"
    }
  ],
  note: {
    type: String
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
