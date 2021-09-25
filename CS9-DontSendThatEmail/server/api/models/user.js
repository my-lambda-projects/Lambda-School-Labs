// place for user model
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 11;
const ObjectId = mongoose.Schema.Types.ObjectId;

//User Model Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  letters: [
    {
      type: ObjectId,
      ref: "Letter"
    }
  ],
  membership: {
    type: Boolean,
    default: false
  },
  subscription: String
});

//Added in Bcrypt for PW hashing
userSchema.pre("save", function(next) {
  // check if record is new, fixes the issue with rehashing user's password on 
  // each added letter that calls save()
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

// Checks PW to make sure it is valid 
userSchema.methods.checkPassword = function(plainTextPW, callback) {
  return bcrypt.compare(plainTextPW, this.password, function(err, isValid) {
    if (err) {
      return callback(err);
    }
    callback(null, isValid);
  });
};

// Custom method for pushing new versions of letters to user object as reference
userSchema.methods.addLetter = function(letter_id) {
  this.letters.push(letter_id);
};

// To check if the user is not duplicate email on update letter
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
