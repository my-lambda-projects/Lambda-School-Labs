const mongoose = require('mongoose');
const Users = require('./userModel');
const ObjectId = mongoose.Schema.Types.ObjectId;

const MeetupSchema = mongoose.Schema(
  {
    dateOfEvent: {
      type: Date,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 40,
    },
    linkToEvent: {
      type: String,
    },
    notes: {
      type: String,
      maxlength: 100,
    },
    user: {
      type: ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true },
);
// add validation for link string types

module.exports = mongoose.model('Meetups', MeetupSchema);
