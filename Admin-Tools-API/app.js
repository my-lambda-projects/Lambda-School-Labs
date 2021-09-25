require('dotenv').config();

const express = require('express');

const env = process.env.NODE_ENV || 'development';
const server = express();
const config = require('./config/config')[env];

// express setup
require('./config/express')(server, config);

// db setup
require('./config/mongoose')(config);

// routes 
require('./config/routes')(server);

server.listen(config.port, (err) => {
  if (err) throw new Error('Error running server', err);
  console.log(`Server up on ${config.port}`);
});
