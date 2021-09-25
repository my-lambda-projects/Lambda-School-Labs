const User = require('../../models/users');
const Invoice = require('../../models/invoices');
const Reminders = require('../../models/Reminder');

const deleteInvoice = (req, res) => {
  const { _id, invoices } = req.user;
  const { number } = req.params;
  const inv = invoices.filter(invoice => invoice.number === number)[0];

  if (!inv) {
    return res.status(404).json({ message: 'Invoice not found.' });
  }

  const reminders = inv.reminders;

  for (reminder of reminders) {
    console.log(reminder);
    removeReminder(reminder);
  }

  async function removeReminder(rem) {
    return await Reminders.findByIdAndRemove(rem)
      .then(() => console.log(`removed: ${rem}`))
      .catch(err => console.log(`Failed: ${rem}`));
  }

  User.findOneAndUpdate(
    { _id },
    { $pull: { invoices: inv._id } },
    { returnNewDocument: true }
  )
    .select('-password')
    .populate('invoices')
    .then(() => {
      Invoice.findByIdAndRemove(inv._id)
        .then(() => {
          User.findById(_id)
            .select('-password')
            .populate('invoices')
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
};

module.exports = { deleteInvoice };
