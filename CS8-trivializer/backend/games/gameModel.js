const mongoose = require("mongoose");


const gameSchema = new mongoose.Schema({
  userId: { 
    type: String
  },
  name: {
    type: String,
    default: "New Game" ,
    maxlength: 36 //arbitrary
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date: { 
    type: Date,
    default: Date.now
  },
  logo: {
    data: Buffer,
    contentType: String, 
    default: ''
  },

});


module.exports = mongoose.model("Game", gameSchema);
