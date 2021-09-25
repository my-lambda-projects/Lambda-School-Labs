const   logger = require('morgan');
				bodyParser = require('body-parser');
				cors = require('cors');


module.exports = (server, config) => {
	server.use(logger('dev'));
	server.use(bodyParser.json());
	server.use(cors());
}