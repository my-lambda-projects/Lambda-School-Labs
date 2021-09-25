const db = require('../../knex');

module.exports = {
	get,
	getById
};

function get() {
	return db('billing');
}

function getById(propertyId) {
	return db('billing').where({ propertyId });
}
