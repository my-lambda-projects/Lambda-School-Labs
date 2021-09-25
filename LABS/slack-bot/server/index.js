/**
   slack-bot/server/index.js
   ==================================
   Project: Hey-Team Slack App
   Created: 2018-05-04
   Updated: 2018-05-17
   Version: 0.3.2
   About:   Main server file
   Notes:   
   -----------------------------------
 */

require('dotenv').config();
const KEYS = require('../config/keys');
const PORT = process.env.PORT || process.env.DEV_SERVER_PORT;

const debug = require('debug')('server:main');
debug('booting...');

const express = require('express');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', PORT);
debug(`PORT set to ${app.get('port')}`);

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message": "Hey Team!  Hello from hey-team-server"}');
});

app.listen(PORT, () => console.log(`Process ${process.pid}: Listening on port ${PORT}`));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
	res.sendFile(path.resolve(
	    __dirname, 'client', 'build', 'index.html'
	));
    });
}

module.exports = app;
