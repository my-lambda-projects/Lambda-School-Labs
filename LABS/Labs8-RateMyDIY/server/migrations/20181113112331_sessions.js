exports.up = function(knex, Promise) {
	return knex.schema.createTable('sessions', table => {
		table.string('sid').notNullable();
		table.json('sess').notNullable();
		table
			.timestamp('expired')
			.notNullable()
			.defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('sessions');
};
