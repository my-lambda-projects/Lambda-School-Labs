const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchoolSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
  },
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }], // an array of object ids that will come from the user model.
  houses: [{
    type: Schema.Types.ObjectId,
    ref: 'House',
  }], // an array of ids that will come from house model.
  location: String,
  nextPaymentDue: {
    type: Date,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('School', SchoolSchema);
