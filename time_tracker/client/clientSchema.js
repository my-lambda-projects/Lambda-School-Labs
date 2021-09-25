const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require('bcrypt');

const ClientSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  contact: { type: String },
  vendors: [{ type: ObjectId, ref: 'Vendor' }],
  invoices: [{ type: ObjectId, ref: 'Invoice' }],
  hoursLogged: [{ type: ObjectId, ref: 'Timestamp' }],
  paid: { type: Boolean, default: true }
});

ClientSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11).then(hash => {
    this.password = hash;
    next();
  });
});

ClientSchema.methods.comparePass = function(plainText, cb) {
  bcrypt.compare(plainText, this.password, (err, isMatch) => {
    if (err) return err;
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Client', ClientSchema);
