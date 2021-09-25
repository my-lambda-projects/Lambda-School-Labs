const mongoose = require('mongoose');

module.exports = (config) => {
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db, { useMongoClient: true});

	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Lambda Labs database connection error...'));
	db.once('open', () => console.log('Db connection active...'));
}