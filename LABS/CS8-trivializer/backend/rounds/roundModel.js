const mongoose = require('mongoose');

//round name, round category, number of questions

const roundSchema = new mongoose.Schema({
    gameId: {
        type: String
    },
    roundName: {
        type: String,
        default: "Trivializer Round"
    },
    numberOfQuestions: {
        type: String,
    },
    category: { 
        type: String,
    },
    difficulty: {
        type: String,
    },
    type: {
        type: String,
    },
    questions: { //supplied by API
        type: Array,
        
    },

})

module.exports = mongoose.model('Round', roundSchema)