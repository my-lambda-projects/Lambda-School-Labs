exports.up = function(knex) {
	return knex.schema.createTable("groups_users", groups_users => {
		groups_users.increments();

		groups_users
			.integer("user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
		groups_users.string("user_type").notNullable();
		groups_users
			.integer("group_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("groups")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
		groups_users.timestamps(true, true);

		groups_users.unique(["user_id", "group_id"]);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("groups_users");
};
