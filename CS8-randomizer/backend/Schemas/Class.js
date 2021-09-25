const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const subSchema = new mongoose.Schema({
  first_name: {
    type: String,
    maxlength: 25
  },
  last_name: {
    type: String,
    maxlength: 25
  },
  participated: {
    type: Boolean,
    default: false
  },
  component_state_id: {
    type: "String"
  }
});

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      maxlength: 25
    },
    num_of_students: {
      type: Number
    },
    participation: {
      type: Number,
      default: 0
    },
    allMode: {
      type: Boolean,
      default: false
    },
    trackMode: {
      type: Boolean,
      default: false
    },
    graph_data: {
      type: Array
    },
    students: [subSchema],
    users: [{ type: ObjectId, ref: "User" }]
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Class", classSchema, "classes");
