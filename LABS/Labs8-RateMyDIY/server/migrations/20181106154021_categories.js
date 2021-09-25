exports.up = function(knex, Promise) {
	return knex.schema.createTable('categories', table => {
		table.increments('category_id'); //primary key
		table
			.string('category_name', 24) // name of category
			.notNullable()
			.unique();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('categories');
};
