exports.up = function(knex, Promise) {
	return knex.schema.createTable('likes', table => {
		table
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('users.user_id')
			.onDelete('CASCADE');
		table
			.integer('review_id')
			.unsigned()
			.notNullable()
			.references('reviews.review_id')
			.onDelete('CASCADE');
		table.integer('like'); //this might be better as a boolean
		table.unique(['user_id', 'review_id']);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('likes');
};
