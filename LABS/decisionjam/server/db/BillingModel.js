const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: false
  },
  subscriptionID: {
    type: String,
    required: true,
    unique: false
  },
  subscriptionType: {
    type: String,
    required: true,
    unique: false
  },
  amountBilled: {
    type: Number,
    required: true,
    unique: false
  },
  subscriptionStartDate: {
    type: Number,
    required: true,
    unique: false
  },
  subscriptionEndDate: {
    type: Number,
    required: true,
    unique: false
  }
});
const BillingModel = mongoose.model("Billing", BillingSchema);
module.exports = BillingModel;
