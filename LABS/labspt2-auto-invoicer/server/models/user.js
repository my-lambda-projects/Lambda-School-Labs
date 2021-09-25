const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    googleId: {
      type: String
    },
    facebookId: {
      type: String
    },
    companies: {
      type: [Schema.Types.ObjectId],
      ref: 'Company'
    },
    invoices: {
      type: [Schema.Types.ObjectId],
      ref: 'Invoice'
    },
    defaultCompany: {
      type: String
    },
    premium: {
      type: Boolean,
      default: false,
      required: true
    },
    premiumExpiresOn: {
      type: String
    },
    newAccount: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
