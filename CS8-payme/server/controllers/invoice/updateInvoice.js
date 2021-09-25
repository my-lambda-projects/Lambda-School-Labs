const Invoice = require('../../models/invoices');

const updateInvoice = (req, res) => {
  let img;
  let data = null;
  let contentType = null;
  if (req.files && req.files.file) {
    data = req.files.file.data;
    contentType = req.files.file.mimetype;
    img = { data, contentType };
  }
  // we need to do two things
  // check to see if the current image has been updated
  const { _id, invoices } = req.user;
  const { invNumber } = req.params;
  const {
    clientName,
    companyName,
    isPaid,
    number,
    totalAmount,
    phone,
    email,
  } = req.body;
  
  let invoice = invoices.filter(inv => inv.number === invNumber);
  if (invoice.length === 0) {
    return res.status(404).json({ message: 'Invoice not found.' });
  } else {
    invoice = invoice[0];
  }
  Invoice.findById(invoice._id)
    .then(inv => {
      if (clientName) inv.clientName = clientName;
      if (companyName) inv.companyName = companyName;
      if (isPaid) inv.isPaid = isPaid;
      if (number) inv.number = number;
      if (img) inv.img = img;
      if (totalAmount) inv.totalAmount = totalAmount;
      if (phone && phone.number) inv.phone.number = phone.number;
      if (phone && phone.frequency) inv.phone.frequency = phone.frequency;
      if (email && email.address) inv.email.address = email.address;
      if (email && email.frequency) inv.email.frequency = email.frequency;
      inv
        .save()
        .then(newInvoice => {
          console.log(newInvoice);
          res.json(newInvoice);
        })
        .catch(err =>
          res.status(500).json({ message: 'Failed to update invoice.' })
        );
    })
    .catch(err => res.status(500).json(err));
};

module.exports = { updateInvoice };
