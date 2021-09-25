exports.up = function(knex, Promise) {
	return knex.schema.createTable('properties', (table) => {
		table.increments();
		table.string('name').notNullable().unique();
		table.string('address').notNullable();
		table.string('city').notNullable();
		table.string('state').notNullable();
		table.string('zip').notNullable();
		table.integer('owner').notNullable().references('id').inTable('landlords');
		table.integer('max').notNullable().defaultTo(2);
		table.integer('sqft').notNullable();
		table.integer('rooms').notNullable();
		table.integer('bathrooms').notNullable();
		table.integer('year').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('properties');
};
