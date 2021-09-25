exports.up = function(knex, Promise) {
	return knex.schema.createTable('project_categories', table => {
		table
			.integer('project_id')
			.unsigned()
			.notNullable()
			.references('projects.project_id')
			.onDelete('CASCADE');
		table
			.integer('category_id')
			.unsigned()
			.references('categories.category_id')
			.onDelete('CASCADE');
		table.unique(['project_id', 'category_id']);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('project_categories');
};
