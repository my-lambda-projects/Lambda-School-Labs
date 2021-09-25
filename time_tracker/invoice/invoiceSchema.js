const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const InvoiceSchema = new Schema({
  hoursLogged: [{ type: ObjectId, ref: 'Timestamp' }],
  paid: { type: Boolean, default: false },
  confirmation: { type: String },
  invoiceNum: { type: String },
  clientNum: { type: ObjectId, ref: 'Client' },
  vendorNum: { type: ObjectId, ref: 'Vendor' },
  url: { type: String },
  dateCreated: { type: Date, default: Date.now() },
  total: { type: Number }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
