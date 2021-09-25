const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Sentry = require('@sentry/node');
const authRouter = require('../auth/auth-router');
const crimeTotalRouter = require('../population/pop-router')
const userRouter = require('../users/users-router')
const demoRouter = require('../demographics/demo-router')
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/total",crimeTotalRouter)
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/demo", demoRouter);
server.get('/', (req, res) => {
	res.json({ api: 'my boy is alive' });
});




//and then
Sentry.init({ dsn: 'https://49f25e3c85e04f3e8a52532569fcc327@sentry.io/1761394' });

module.exports = server;