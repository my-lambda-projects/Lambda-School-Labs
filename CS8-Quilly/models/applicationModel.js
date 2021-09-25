const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    company: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    submitted: {
      type: Boolean,
      default: false
    },
    onsiteInterview: {
      type: Boolean,
      default: false
    },
    receivedResponse: {
      type: Boolean,
      default: false
    },
    whiteboard: {
      type: Boolean,
      default: false
    },
    phoneInterview: {
      type: Boolean,
      default: false
    },
    codeTest: {
      type: Boolean,
      default: false
    },
    rejection: {
      type: Boolean,
      default: false
    },
    offer: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      default: 'wishlist'
    },
    notes: String,
    jobSource: String,
    linkToJobPost: String,
    pointOfContact: String,
    resume: String,
    testData: {
      type: Boolean,
      default: false
    }
  },
    {
      timestamps: true
  });

  module.exports = mongoose.model('Application', applicationSchema);
