const stripe = require('stripe')(process.env.STRIPE_SK);
const Invoice = require('../../models/invoices');

const payInvoice = async function(req, res) {
  try {
    const { amount, invoiceId, source, description, code, scope } = req.body;
    // const { code, scope } = req.body.admin;
    console.log(req.body);
    let { status } = await stripe.charges.create({
      amount,
      currency: 'usd',
      description,
      source,
      destination: {
        amount: Math.round(amount * 0.95),
        account: code,
      },
    });
    console.log(`status: ${status}`);
    if (status === 'succeeded') {
      console.log(invoiceId);
      Invoice.findByIdAndUpdate(
        invoiceId,
        {
          isPaid: true,
          totalAmount: 0,
        },
        { new: true }
      ).then(invoice => {
        res.json({ status, invoice });
      });
    } else {
      res.json({ status });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { payInvoice };
