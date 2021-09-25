const db = require("../data/db-config");

module.exports = {
	add,
	find,
	update,
	remove
};

function add(reply) {
	return db("replies")
		.insert(reply, ["*"])
		.then(reply => find({ "r.id": reply[0].id }).first());
}

function find(filters) {
	if (Array.isArray(filters.post_id)) {
		return db("replies as r")
			.leftJoin("users as u", "u.id", "r.user_id")
			.select(
				"r.id",
				"u.id as user_id",
				"r.post_id",
				"r.reply_content",
				"r.created_at",
				"r.updated_at",
				"u.first_name",
				"u.last_name",
				"u.image"
			)
			.whereIn("post_id", filters.post_id);
	} else if (filters) {
		return db("replies as r")
			.leftJoin("users as u", "u.id", "r.user_id")
			.select(
				"r.id",
				"u.id as user_id",
				"r.post_id",
				"r.reply_content",
				"r.created_at",
				"r.updated_at",
				"u.first_name",
				"u.last_name",
				"u.image"
			)
			.where(filters);
	} else {
		return db("replies as r")
			.leftJoin("users as u", "u.id", "r.user_id")
			.select(
				"r.id",
				"u.id as user_id",
				"r.post_id",
				"r.reply_content",
				"r.created_at",
				"r.updated_at",
				"u.first_name",
				"u.last_name",
				"u.image"
			);
	}
}

function update(filters, changes) {
	// only allow one update at a time, so uses .first()
	return db("replies")
		.update(changes, ["*"])
		.where(filters)
		.then(r =>
			find({
				"r.id": r[0].id
			}).first()
		);
}

function remove(filters) {
	// only returns the number of deleted entries
	return db("replies")
		.where(filters)
		.del();
}
