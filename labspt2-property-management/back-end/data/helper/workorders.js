const db = require('../../knex');

module.exports = {
	create,
	getByTenantId,
	getById,
	get,
	editById,
	getByPropertyId,
	getByLandlordId,
	deleteById
};

function create(workorder) {
	return db('workorders').insert(workorder);
}

function getByPropertyId(property_id) {
	return db('workorders').where({ property_id });
}

function getByTenantId(id) {
	return db('workorders').where({ tenant_id: id });
}

function getById(id) {
	return db('workorders').where({ id }).first();
}

function editById(id, workorder) {
	return db('workorders').where({ id }).update(workorder);
}

function get() {
	return db('workorders');
}

function deleteById(id) {
	return db('workorders').where({ id }).first().del();
}

function getByLandlordId(landlord_id) {
	return db('workorders').where({ landlord_id });
}
