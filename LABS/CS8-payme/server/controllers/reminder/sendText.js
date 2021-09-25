require('dotenv').load();

const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const Reminder = require('../../models/Reminder');
const Invoice = require('../../models/invoices');
const User = require('../../models/users');

const scheduler = require('../../workers/scheduler');

const createReminder = (req, res) => {
  console.log(req.body);
  const {
    invoiceId,
    rPhone,
    message,
    isEmail,
    email,
    name,
    amount,
    company,
    remind,
    date,
  } = req.body;

  const reminder = new Reminder({
    invoiceId,
    name,
    phoneNumber: rPhone,
    email,
    message,
    isEmail,
    amount,
    company,
    remind,
    days: date,
  });

  const { _id } = req.params;

  reminder.save().then(newreminder => {
    console.log(newreminder);
    Invoice.findByIdAndUpdate(_id, {
      $addToSet: { reminders: newreminder._id },
    })
      .populate('reminders')
      .then(inv => {
        res.json(newreminder);

        scheduler.scheduleSEND(newreminder); // schedule reminder
      })
      .catch(err => {
        console.log(err);
      });
  });
};
const allReminders = (req, res) => {
  Reminder.find({}).then(reminders => {
    res.json(reminders);
  });
};

const setofReminders = (req, res) => {
  // const { _id } = req.params;
  // Invoice.findById(_id)
  //   .then(invoice => {
  //     // console.log(invoice);
  //     Reminder.find({ invoiceId: invoice._id })
  //       .then(reminders => {
  //         // console.log(reminders);
  //         res.json(reminders);
  //       })
  //       .catch(err => {
  //         res.send(err);
  //       });
  //   })
  //   .catch(err => {
  //     res.send(err);
  //   });
  const { invoices } = req.user;
  invoices.map(rem => {
    res.send(rem.reminders);
  });
  // invoices
  //   .find({})
  //   .populate('reminders')
  //   .then(list => {
  //     res.json(list);
  //   });
};

const getReminder = (req, res) => {
  const { id } = req.params;
  Reminder.findOne({ _id: id })
    .then(reminder => {
      // if (reminder) {
      res.json(reminder);
      // }
      // res.redirect('/api/sms');
      console.log('this was deleted');
    })
    .catch(err => {
      res.status(500).json(err);
      // console.log(err);
    });
};

const deleteReminder = (req, res) => {
  const { invoiceId, reminderId } = req.query;
  // const { _id } = req.user;
  // console.log(req.query);
  // console.log(reminderId);
  // console.log(invoiceId);

  Invoice.findByIdAndUpdate(
    invoiceId,
    { $pull: { reminders: reminderId } },
    { new: true }
  )
    .populate('reminders')
    .then(invoice => {
      // console.log('invoice\n', invoice);
      Reminder.findByIdAndRemove(reminderId)
        .then(() => {
          // console.log(invoice);
          res.json(invoice.reminders);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // res.status(401).json({ message: 'testing' });
};

const cancelSchedule = (req, res) => {
  const { id } = req.params;

  Reminder.findById(id)
    .then(reminder => {
      res.send(reminder);
      scheduler.cancelSEND(reminder._id);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = {
  setofReminders,
  allReminders,
  getReminder,
  createReminder,
  deleteReminder,
  cancelSchedule,
};
