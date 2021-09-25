const db = require("../data/db-config");

module.exports = {
	add,
	find,
	remove
};

function add(user_allegiance) {
	return db("users_allegiances")
		.insert(user_allegiance, ["*"])
		.then(u_a => find({ "u_a.id": u_a[0].id }).first());
}

function find(filters) {
	if (filters) {
		return db("users_allegiances as u_a")
			.leftJoin("allegiances as a", { "a.id": "u_a.allegiance_id" })
			.leftJoin("users as u", { "u.id": "u_a.user_id" })
			.where(filters)
			.select(
				"u_a.id as id",
				"u.id as user_id",
				"username",
				"u.first_name as first_name",
				"u.last_name as last_name",
				"u.image as user_image",
				"a.id as allegiance_id",
				"a.allegiance_name as allegiance_name",
				"a.image as allegiance_image",
				"a.sport as sport"
			);
	} else {
		return db("users_allegiances as u_a")
			.leftJoin("allegiances as a", { "a.id": "u_a.allegiance_id" })
			.leftJoin("users as u", { "u.id": "u_a.user_id" })
			.select(
				"u_a.id as id",
				"u.id as user_id",
				"username",
				"u.first_name as first_name",
				"u.last_name as last_name",
				"u.image as user_image",
				"a.id as allegiance_id",
				"a.allegiance_name as allegiance_name",
				"a.image as allegiance_image",
				"a.sport as sport"
			);
	}
}

function remove(filter) {
	// only returns the number of deleted entries
	return db("users_allegiances")
		.where(filter)
		.del();
}
