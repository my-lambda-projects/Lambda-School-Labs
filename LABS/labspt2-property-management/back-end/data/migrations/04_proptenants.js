exports.up = function(knex, Promise) {
	return knex.schema.createTable('proptenants', (table) => {
		table.integer('tenant_id').references('id').inTable('tenants');
		table.integer('property_id').references('id').inTable('properties');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('proptenants');
};
