const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  height: {
    type: Number
  },
  progress: [
    {
      type: Schema.Types.ObjectId,
      ref: "Progress"
    }
  ],
  weightRecords: [
    {
      date: {
        type: Date
      },
      weight: {
        type: Number
      }
    }
  ],
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],
  routines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Routine"
    }
  ],
  calendar: [
    {
      date: {
        type: Date,
        default: Date.now()
      },
      workout: {
        type: Schema.Types.ObjectId,
        ref: "Workout"
      }
    }
  ],
  premiumUser: {
    type: Boolean,
    default: false
  }
});

// TODO: Refactor one or the other pre or checkPW for consistent async handling
UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = async function(plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
