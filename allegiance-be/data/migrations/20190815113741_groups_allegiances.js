exports.up = function(knex) {
	return knex.schema.createTable("groups_allegiances", groups_allegiances => {
		groups_allegiances.increments();

		groups_allegiances
			.integer("group_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("groups")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");

		groups_allegiances
			.integer("allegiance_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("allegiances")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");

		groups_allegiances.unique(["group_id", "allegiance_id"]);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("groups_allegiances");
};
