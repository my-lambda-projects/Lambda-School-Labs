const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');
const bcrypt = require('bcrypt');

mongooseTypes.loadTypes(mongoose, 'email');

const { Email, ObjectId } = mongoose.Schema.Types;

const SALT_ROUNDS = 11;

const User = new mongoose.Schema(
  {
    stripe: {
      code: {
        type: String,
        default: '',
      },
      scope: {
        type: String,
        default: '',
      },
    },
    // E-mail address is used as a username
    username: {
      type: Email,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    subscription: {
      type: Number,
      default: 0,
    },
    invoiceCredits: {
      type: Number,
      default: 0,
    },
    recovery: {
      code: String,
      exp: Number,
    },
    invoices: [{ type: ObjectId, ref: 'Invoice' }],
  },
  {
    timestamps: true,
  }
);

User.pre('save', function(next) {
  if (this.password !== null) {
    bcrypt.hash(this.password, SALT_ROUNDS, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      next();
    });
  }
});

User.methods.checkPassword = function(pw, callBack) {
  return bcrypt.compare(pw, this.password, function(err, valid) {
    if (valid) return callBack(null, valid);
    return callBack(err);
  });
};

module.exports = mongoose.model('User', User);
