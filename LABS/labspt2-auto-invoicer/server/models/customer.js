const { Schema, model } = require('mongoose');

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String
    },
    zipCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    companies: {
      type: [Schema.Types.ObjectId],
      ref: 'Company'
    },
    invoices: {
      type: [Schema.Types.ObjectId],
      ref: 'Invoice'
    }
  },
  { timestamps: true }
);

module.exports = model('Customer', customerSchema);
