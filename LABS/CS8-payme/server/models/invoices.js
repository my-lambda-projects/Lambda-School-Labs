const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');

mongooseTypes.loadTypes(mongoose, 'email');

const { Email, ObjectId } = mongoose.Schema.Types;
const Reminder = require('./Reminder.js');

const Invoice = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    number: {
      type: String,
      required: true,
    },
    img: { data: Buffer, contentType: String },
    totalAmount: {
      type: Number,
      required: true,
    },
    phone: {
      number: Number,
      frequency: {
        type: String,
        default: 'weekly',
      },
    },
    email: {
      address: Email,
      frequency: {
        type: String,
        default: 'weekly',
      },
    },
    admin: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    reminders: [{ type: ObjectId, ref: 'Reminder' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Invoice', Invoice);
