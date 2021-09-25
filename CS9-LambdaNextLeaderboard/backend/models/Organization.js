const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  admins: [
    {
      type: ObjectId,
      ref: "admins"
    }
  ],
  classes: [
    {
      type: ObjectId,
      ref: "classes"
    }
  ],
  createdOn: {
    type: Date,
    default: Date.now()
  },
  stripeCustomerID: {
    type: String,
    default: null,
  },
});

module.exports = Organization = mongoose.model(
  "organizations",
  OrganizationSchema
);
