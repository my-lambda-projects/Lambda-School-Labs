exports.up = function(knex) {
	return knex.schema.createTable("users_allegiances", users_allegiances => {
		users_allegiances.increments();

		users_allegiances
			.integer("user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");

		users_allegiances
			.integer("allegiance_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("allegiances")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");

		users_allegiances.unique(["user_id", "allegiance_id"]);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("users_allegiances");
};
