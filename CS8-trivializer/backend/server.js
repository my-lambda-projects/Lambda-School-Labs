const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router.js');
const config = require("./config");
const server = express();

mongoose
    .connect(config.db_url) // environment variable 
    .then(() => {
        console.log('CONNECTED TO MONGODB!')
    }).catch(err => {
        console.log(err, "UNABLE TO CONNECT TO DB")
    })



server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
// server.use(cors());
server.use(cors({credentials: true, origin: '*'})); //change to local host for testing

const setupRoutes = require('./router.js')(server); //Handles all of the jwt-simple and passport authentication

const userController = require('./users/userController.js');
const gameController = require('./games/gameController.js');
const roundController = require('./rounds/roundController.js');

const { stripeCharge } = require('./stripe/stripeController.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`API RUNNING ON ${port}`))


server.get('/', (req, res) => {
    res.status(200).json({ api: 'RUNNING' });
});
server.use('/api/user', userController);
server.use('/api/game', gameController);
server.use('/api/round', roundController);
server.post('/api/charge', stripeCharge);
