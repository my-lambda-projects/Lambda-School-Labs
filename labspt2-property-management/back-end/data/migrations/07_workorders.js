exports.up = function(knex, Promise) {
	return knex.schema.createTable('workorders', (table) => {
		table.increments();
		table.integer('property_id').notNullable().references('id').inTable('properties');
    table.integer('tenant_id').notNullable().references('id').inTable('tenants');
    table.integer('landlord_id').notNullable().references('id').inTable('landlords')
		table.text('description').notNullable();
		table.string('phone').notNullable();
		table.boolean('entry').notNullable();
		table.string('status').notNullable().defaultTo('incomplete');
		table.string('image').notNullable().defaultTo('none');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('workOrders');
};
