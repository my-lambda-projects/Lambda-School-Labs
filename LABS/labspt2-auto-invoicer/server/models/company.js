const { Schema, model } = require('mongoose');

const companySchema = new Schema(
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
    users: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    },
    customers: {
      type: [Schema.Types.ObjectId],
      ref: 'Customer'
    },
    items: {
      type: [Schema.Types.ObjectId],
      ref: 'Item'
    },
    invoices: {
      type: [Schema.Types.ObjectId],
      ref: 'Invoice'
    },
    defaultTerms: {
      type: String
    },
    defaultNotes: {
      type: String
    },
    startingInvoiceNumber: {
      type: String,
      required: true,
      default: '1'
    }
  },
  { timestamps: true }
);

module.exports = model('Company', companySchema);
