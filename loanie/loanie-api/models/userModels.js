const mongoose = require("mongoose");

// This table stores profile details of all users. There should always be exactly 1 row
// for a user in this table.
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  mobilePhone: {
    type: String,
  },
  acceptTexts: {
    type: Boolean,
  },
  acceptEmails: {
    type: Boolean,
  },
  UID: {
    type: String,
  },
  subExp: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
