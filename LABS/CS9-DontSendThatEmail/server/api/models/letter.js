// place for letter model
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const ObjectId = mongoose.Schema.Types.ObjectId;

//Letter Model Schema
const LetterSchema =  new Schema ({
    user_id: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        trim: true,
        default: "N/A",
    },
    versions: [
        {
        content: {
            type: String,
            required: true,
            },
        },
    ],
    timestamp: {
        type: Date, 
        default: Date.now,
    },
});


module.exports = mongoose.model('Letter', LetterSchema);