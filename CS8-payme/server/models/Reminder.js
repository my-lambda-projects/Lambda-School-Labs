const mongoose = require('mongoose');

const scheduler = require('../scheduling/scheduler');

const ReminderSchema = new mongoose.Schema({
  invoiceId: String,

  name: String,

  company: String,

  email: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    maxlength: 40,
  },

  amount: {
    type: Number,
  },

  isEmail: {
    type: Boolean,
    default: false,
    required: true,
  },

  remind: {
    type: String,
    required: true,
  }, // custom, daily, weekly, monthly

  days: {
    type: Date,
    default: Date.now(),
  },
});

/*************************************
 * Finds all reminders that need sending if
 * server restarts and schedules them again.
 */
ReminderSchema.statics.query = function() {
  Reminder.find({}).then(reminders => {
    reminders.forEach(function(reminder) {
      // console.log('sched for ' + reminder.name);
      scheduler.scheduleSEND(reminder);
    });
  });
};
/**************************************/

const Reminder = mongoose.model('Reminder', ReminderSchema);
module.exports = Reminder;
