const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Note = require('./model');
const port = process.env.PORT || 8000;
const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(morgan('combined'));

const ERROR_HELPER = (err, res) => {
  if (typeof err === 'object') {
    res.json(err);
    return;
  } else {
    res.json({ errorMessage: err });
    return;
  }
};

server.get('/note/get/all', (req, res) => {
  const notes = Note.find({}, (err, notes) => {
    if (err) return ERROR_HELPER(err, res);
    res.json(notes);
  });
});

server.get('/note/get/:id', (req, res) => {
  const id = req.params.id;
  const note = Note.findById(id, (err, note) => {
    if (err) return ERROR_HELPER(err, res);
    if (note === null) return ERROR_HELPER('No note found by that Id', res);
    res.json(note);
  });
});

server.post('/note/create', (req, res) => {
  const { title, textBody } = req.body;
  const newNote = new Note({ title, textBody });
  newNote.save((err, savedNote) => {
    if (err) return ERROR_HELPER(err, res);
    res.json({ success: savedNote._id });
  });
});

server.put('/note/edit/:id', (req, res) => {
  const id = req.params.id;
  const { title, textBody } = req.body;
  Note.findById(id, (err, note) => {
    if (err) return ERROR_HELPER(err, res);
    if (note === null) return ERROR_HELPER('No note found by that Id', res);
    if (title) {
      note.title = title;
    }
    if (textBody) {
      note.textBody = textBody;
    }
    note.save((err, updatedNote) => {
      if (err) return ERROR_HELPER(err, res);
      res.json(updatedNote);
    });
  });
});

server.delete('/note/delete/:id', (req, res) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id, (err, note) => {
    if (err) return ERROR_HELPER(err, res);
    res.json({ success: 'Note successfully deleted' });
  });
});

server.get('/', (req, res) => {
  res.send('Home!');
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://andrewj:ajdavis@ds263948.mlab.com:63948/notes');

server.listen(port, err => {
  if (err) console.error(err);
  console.log(`Magic Happening on ${port}`);
});
