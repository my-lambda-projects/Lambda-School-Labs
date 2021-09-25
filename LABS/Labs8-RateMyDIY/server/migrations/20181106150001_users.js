exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', table => {
		table.increments('user_id'); //primary key
		table
			.string('auth_id') // auth0 id
			.notNullable()
			.unique();
		table
			.string('username', 16) // username chosen at registration
			.notNullable()
			.unique();
		table.string('img_url');
		table.decimal('user_rating'); // average rating among all projects
		table.integer('rating_sum').unsigned(); // sum of all ratings among projects
		table.integer('rating_count').unsigned(); // count of all ratings among projects
		table.integer('helpfulness').defaultTo(0); // total likes minus dislikes
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
