exports.up = function(knex) {
	return knex.schema.table("users", users => {
		users.timestamp("notification_check");
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table("users", users => {
		users.dropColumn("notification_check");
	});
};
