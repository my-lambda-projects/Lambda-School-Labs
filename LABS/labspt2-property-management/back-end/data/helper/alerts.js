const db = require('../../knex');

module.exports = {
	get,
	getById,
	create,
	deleteById,
	editById
};

function get() {
	return db('alerts');
}

function getById(id) {
	return db('alerts').where({ id }).first();
}

function create(alert) {
	return db('alerts').insert(alert);
}

function deleteById(id) {
	return db('alerts').where({ id }).del();
}

function editById(id, alert) {
	return db('alerts').where({ id }).update(alert);
}
