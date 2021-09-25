const Invoice = require('../../models/invoices');

const getAllInvoices = (req, res) => {
  const { invoices } = req.user;
  res.json(invoices);
  // User.findById(_id)
  //   .select('-password')
  //   .populate('invoices')
  //   .then(user => {
  //     res.json({ invoices: user.invoices });
  //   })
  //   .catch(err => res.send(500).json(err));
};

const getOneInvoice = (req, res) => {
  const { invoices } = req.user;
  const { number } = req.params;
  for (invoice of invoices) {
    if (invoice.number === number) {
      return res.json(invoice);
    }
  }
  res.status(404).json({ message: 'Invoice number does not exist.' });
};

const clientInvoice = (req, res) => {
  const { invoiceID } = req.params;
  Invoice.findById(invoiceID)
    .populate('admin', 'stripe companyName fullName username -_id')
    .then(response => {
      if (!response) {
        return res.status(404).json({ message: 'Invoice not found.' });
      }
      // const {code, scope} = response.admin.stripe
      res.json(response);
    })
    .catch(err => res.status(500).json(err));
};

const getpdf = (req, res) => {
  const { id } = req.params;
  console.log(id);
  Invoice.findById(id)
    .select('img')
    .then(doc => {
      res.contentType(doc.img.contentType);
      res.send(doc.img.data);
    })
    .catch(err => {
      if (err) return err;
    });
};

module.exports = {
  getOneInvoice,
  getAllInvoices,
  clientInvoice,
  getpdf,
};
