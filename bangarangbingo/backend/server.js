const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('./controllers/Auth');
const card = require('./controllers/Card');
const payments = require('./controllers/Payment');

const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/bingo';
const server = express();

server.use(cors({
  origin: process.env.MONGODB_URI ? 'https://www.bangarangbingo.com' : 'http://localhost:3000',
  credentials: true,
}));

server.use(bodyParser.json());

mongoose.connect(DB_URL);
mongoose.set('debug', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.use(express.static(path.join(__dirname, '../client/build')));

server.post('/auth/register', auth.register);
server.post('/auth/login', auth.login);
server.post('/auth/reset', auth.reset);
server.post('/auth/update', auth.update);
server.get('/cards', card.getAll);
server.post('/card/create', card.create);
server.post('/card/edit', card.edit);
server.get('/card/download/:id', card.download);
server.get('/card/:id', card.get);
server.post('/payments', payments.process);
server.get('/pdf/download/:id', card.pdfdownload);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = server;

