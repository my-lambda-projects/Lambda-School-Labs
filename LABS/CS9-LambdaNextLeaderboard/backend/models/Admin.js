const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  organizations: [
    {
      type: ObjectId,
      ref: "organizations"
    }
  ],
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Admin = mongoose.model("admins", AdminSchema);
