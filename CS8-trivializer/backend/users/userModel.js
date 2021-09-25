const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  user_type: {
    // Free, Paid, Premium
    type: String,
    default: "Free",

  },
  orgName: {
    type: String,
    default: "Organization"
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  },

});

userSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(guess, callback) {
  bcrypt.compare(guess, this.password, function(err, isValid) {
    if (err) {
      return callback(err);
    }
    callback(null, isValid);
  });
};

module.exports = mongoose.model("User", userSchema);
