const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));

server.use(express.urlencoded({ extended: true }));

const STATUS_SUCCESS = 200;

const { messagesFeed } = require('../../models/models');

server.post('/twilio-status', (req, res) => {
  const { MessageStatus } = req.body;
  // Responds to any status update AFTER the message is queued
  res.sendStatus(STATUS_SUCCESS);
  if (
    MessageStatus === 'sent' ||
    MessageStatus === 'delivered' ||
    MessageStatus === 'undelivered' ||
    MessageStatus === 'failed'
  ) {
    messagesFeed();
  }
});

module.exports = server;
