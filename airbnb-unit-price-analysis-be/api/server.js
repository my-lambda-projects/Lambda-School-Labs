const express = require('express');
const apiRouter = require('./router');
const cors = require('cors')


const server = express();

server.use(cors())

const logger = (req, res, next) => {
  console.log(`${req.method} request was made to ${req.url}`);
  next();
};

server.use(express.json());


server.get("/", (req, res) => {
  res.send(`<h2>AirBnB Unit Price Analysis</h2>`);
});

server.use('/api', logger, apiRouter);

module.exports = server;
