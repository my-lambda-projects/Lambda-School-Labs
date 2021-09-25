// require('dotenv').config({path: '../.env'});
var dotenv = require('dotenv');
dotenv.load();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

// TEMP COMMENT OUT
// const adminEndpoints = require('./admin/adminEndpoints.js');
const usersEndpoints = require('./endpoints/usersEndpoints.js');
const eventsEndpoints = require('./endpoints/eventsEndpoints.js');
const notifyEndpoints = require('./endpoints/notifyEndpoints.js');
const checkoutEndpoints = require('./endpoints/checkoutEndpoints.js');
const inviteEndpoints = require('./endpoints/eventInvitesEndpoints');

const PORT = process.env.PORT || process.env.LOCAL_PORT;
const server = express();

server.use(bodyParser.json());
server.use(morgan('common'));
server.use(helmet());
server.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// TEMP COMMENT OUT
// server.use('/api/admin', adminEndpoints);
server.use('/api/users', usersEndpoints);
server.use('/api/events', eventsEndpoints);
server.use('/api/notify', notifyEndpoints);
server.use('/api/checkout', checkoutEndpoints);
server.use('/api/invites', inviteEndpoints);

// USED FOR PRODUCTION ONLY
if (process.env.NODE_ENV === 'production') {
  // Priority serve any static files.
  server.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  server.get('*', function(request, response) {
    response.sendFile(
      path.resolve(__dirname, '../react-ui/build', 'index.html')
    );
  });
}

server.listen(PORT, () => console.log(`SERVER - running on port ${PORT}`));
