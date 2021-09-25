const PORT = process.env.PORT || 5000;

// Modules
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const server = express();

const database = require('./database');

// Global Middleware
server.use(bodyParser.json());
server.use(cors());
server.use(morgan('combined'));

// Creating Log Files
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './access.log'),
  { flags: 'a'}
);

// Running the auth routes
const authRoutes = require('./auth/routes/routes');

authRoutes(server);

// Running the Pricing routes
const pricingRoutes = require('./pricing/routes/routes');

pricingRoutes(server);

// Running the School routes
const schoolRoutes = require('./schools/routes/routes');

schoolRoutes(server);

// Running the House routes
const houseRoutes = require('./houses/routes/routes');

houseRoutes(server);

// Running the Teacher routes
const teacherRoutes = require('./teachers/routes/routes');

teacherRoutes(server);

// Connect Database
database.connect();

const httpListener = server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// WebSocket Integration

const io = require('socket.io').listen(httpListener);

const webSocketEvents = {};
webSocketEvents.scores = require('./scores/routes/ScoreRoutes.ws');
// Add more socket events here.

io.on('connection', (socket) => {
  console.log('Websocket is connected');
  /* Routes */
  webSocketEvents.scores(io, socket);

});
