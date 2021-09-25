const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcrypt');

const SALT = 11;

const UserSchema = mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
    lowercase: true
  },
  stripeCustomerID: {
    type: String,
    required: true,
    default: 'none'
  },
  isMember: {
    type: Boolean,
    required: true,
    default: false
  },
  singleDecisions: {
    type: Number,
    require: true,
    default: 0
  },
  resume: {
    title: String,
    url: String,
  },
  jobslist: {
    type: Array,
  },
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT, (err, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(plainTextPassword, cb) {
  bcrypt.compare(plainTextPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Users', UserSchema);
