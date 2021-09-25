/**
 * dependencies
 */
const session = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const { dev, debug } = require('./dev');

const api = require('./api');
const passport = require('./api/auth/passport');

/**
 * env config:
 * MLAB={"PASS":"dbpassword","USER":"dbuser","URI":"ds012345.mlab.com:56789/mydb"}
 *
 * https://docs.mlab.com/connecting/#connect-string
 *
 */
const MLAB = JSON.parse(process.env.MLAB);
mongoose.connect(`mongodb://${MLAB.USER}:${MLAB.PASS}@${MLAB.URI}`);

const server = express();
server.use(express.json());

/**
 * dev dependencies
 */
if (dev) {
	server.use(require('morgan')('combined'));
	// add more here if you'd like, don't forget about scope
}

/**
 * env config:
 * CORS=["https://example.com","http://localhost:3000"]
 */
server.use(cors({ origin: JSON.parse(process.env.CORS), credentials: true }));

/**
 * static files from the frontend
 */
server.use(express.static(path.join(__dirname, 'client/build')));

/**
 * passport requirements
 * and session requirements for passport
 *
 * http://www.passportjs.org/docs/configure/
 *
 */
server.use(express.static('public'));
server.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	}),
);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(passport.initialize());
server.use(passport.session());

/**
 * server api routes are handled through this file:
 * - users
 * - photos
 */
server.use('/api', api);

server.get('/', (req, res) => {
	debug ? res.send({ server: `running` }) : null;
});

/**
 * the "catchall" handler required when building project for production
 *
 * https://daveceddia.com/deploy-react-express-app-heroku/
 *
 */
server.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = server;
