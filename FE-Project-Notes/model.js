const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  textBody: {
    type: String,
    required: true
  },
  tags: [String]
});

module.exports = mongoose.model('Note', NoteSchema);
