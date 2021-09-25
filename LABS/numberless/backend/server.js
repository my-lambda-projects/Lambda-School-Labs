require('dotenv').config();

const bodyParser = require ('body-parser');
const CORS = require('cors');
const express = require ('express');
const mongoose = require ('mongoose');

const server = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const routes = require ('./api/routes/routes');

mongoose.Promise = global.Promise;
mongoose.connect(`${DB_URL}`);

server.use(bodyParser.json());
server.use(CORS());

const whitelist = ['http://localhost:3000', 'http://numberlessapp.herokuapp.com/', 'https://www.numberless.app/']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: 'GET, PUT, POST, DELETE'
}

routes(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




