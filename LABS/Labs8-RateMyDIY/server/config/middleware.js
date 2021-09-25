const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('../setup-passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var KnexSessionStore = require('connect-session-knex')(session);
const db = require('./dbConfig');
var store = new KnexSessionStore({
	knex: db,
	tablename: 'sessions',
	sidfieldname: 'sid',
	createtable: false
});

const sessionConfig = {
	store: store,
	secret: [process.env.SESSION_SECRET || 'TKd8^S$W-HPS3NtF'],
	cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: false }, // 1 week
	resave: false,
	saveUninitialized: false
};

// https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
// Added new qrafts.app domain to allowedOrigins and HEROKU
var allowedOrigins = [
	'http://localhost:3000',
	'https://ratemydiy.netlify.com',
	'https://ratemydiy-dev.netlify.com',
	'https://www.qrafts.app'
];

const corsConfig = {
	credentials: true,
	origin: function(origin, callback) {
		// allow requests with no origin
		// (like mobile apps or curl requests)
		if (!origin) return callback(null, true);

		if (allowedOrigins.indexOf(origin) === -1) {
			var msg =
				'The CORS policy for this site does not ' +
				'allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}

		return callback(null, true);
	}
};

// order matters!
module.exports = server => {
	server.use(logger('tiny'));
	server.use(cors(corsConfig));
	server.use(helmet());
	server.use(express.json());
	server.use(cookieParser());
	server.use(session(sessionConfig));
	server.use(passport.initialize());
	server.use(passport.session());
};
