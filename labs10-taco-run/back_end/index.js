require('dotenv').config()
const express = require('express');
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const knex = require('knex')

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

const userRoutes = require('./Routes/usersRoutes')
const eventsRoutes = require('./Routes/eventsRoutes')
const users_eventsRoutes = require('./Routes/users_eventsRoutes')
const favoritesRoutes = require('./Routes/favoritesRoutes')
const users_friendsRoutes = require('./Routes/users_friendsRoutes')
const paymentRoutes = require("./Routes/paymentRoutes");
const commentsRoutes = require("./Routes/commentsRoutes");

server.use('/users', userRoutes)
server.use('/events', eventsRoutes)
server.use('/users_events', users_eventsRoutes)
server.use('/favorites', favoritesRoutes)
server.use('/users_friends', users_friendsRoutes)
server.use("/payments", paymentRoutes);
server.use("/comments", commentsRoutes)


let app = server.listen(process.env.PORT || 5555, function () {
  let port = app.address().port;
  console.log("Express is working on port " + port);
});

module.exports = server;
