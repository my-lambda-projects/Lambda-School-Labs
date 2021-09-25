const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  classes: [
    {
      type: ObjectId,
      ref: "Class"
    }
  ],
  subscription: {
    type: String,
    default: "trial"
  }
});

// userSchema.pre('update', function(next) {
//   this.findOne({"_id":this.getUpdate().$set._id},function(err, doc){
//     if(doc.password != this.getUpdate().$set.password){
//       this.getUpdate().$set.password = bcrypt.hashSync(this.getUpdate().$set.password, 10);
//     }
//     next();
//   })
// });

userSchema.pre("save", function(next) {
  // Do this before any call of save() method
  
  if (this.password.length < 40) { // TODO: Find a better solution to this double hashing of update User problem
    console.log("this.password: ", this.password)
    bcrypt.hash(this.password, 10).then(hash => {
      this.password = hash;
      console.log("hashed to:", this.password)
      next();
    });
  } else {
    console.log("password saved WITHOUT hashing")
  }
});

userSchema.methods.verifyPassword = function(guess, callback) {
  console.log("vP this.password:", this.password);
  console.log("vP guess:", guess);
  bcrypt.compare(guess, this.password, function(err, isValid) {
    if (err) {
      return callback(err);
    }
    callback(null, isValid);
  });
};

module.exports = mongoose.model("User", userSchema, "users");
