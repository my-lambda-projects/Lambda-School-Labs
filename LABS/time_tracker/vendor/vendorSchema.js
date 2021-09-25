const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const VendorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  paid: { type: Boolean, required: true, default: false },
  hoursLogged: [{ type: ObjectId, ref: 'Timestamp' }],
  clients: [{ type: ObjectId, ref: 'Client' }],
  invoices: [{ type: ObjectId, ref: 'Invoice' }]
});

VendorSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11).then(hash => {
    this.password = hash;
    next();
  });
});

VendorSchema.methods.comparePass = function(plainText, cb) {
  bcrypt.compare(plainText, this.password, (err, isMatch) => {
    if (err) return err;
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Vendor', VendorSchema);
