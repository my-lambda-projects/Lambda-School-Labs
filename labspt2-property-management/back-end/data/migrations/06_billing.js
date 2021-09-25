exports.up = function(knex, Promise) {
	return knex.schema.createTable('billing', (table) => {
		table.increments();
		table.integer('property_id').notNullable().references('id').inTable('properties');
		table.text('property_name').notNullable().references('name').inTable('properties');
		table.integer('date').notNullable();
		table.string('amount').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('billing');
};
