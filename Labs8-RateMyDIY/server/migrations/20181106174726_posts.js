exports.up = function(knex, Promise) {
	return knex.schema.createTable('posts', table => {
		table.increments('post_id'); //primary key

		table
			.integer('project_id') // project's primary key
			.unsigned()
			.notNullable()
			.references('projects.project_id')
			.onDelete('CASCADE');

		table.string('img_url'); // image url

		table.string('text', 1024); // text field; decide on a reasonable max length
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('posts');
};
