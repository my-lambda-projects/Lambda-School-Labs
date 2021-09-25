const moment = require("moment");
const db = require("../data/db-config");
const Posts = require("./posts");

module.exports = {
	findPosts,
	findReplies,
	findPostLikes,
	findReplyLikes
};

function findPosts(filters) {
	// Set interval as number of hours
	const n = filters.interval;
	// Use moment js to convert desired start time for retrieval of data
	const ts = moment(Date.now()).subtract(n, "hours");
	// If multiple groups are received, use whereIn
	if (Array.isArray(filters.group_id)) {
		return db("posts as p")
			.leftJoin("users as u", "u.id", "p.user_id")
			.leftJoin("groups as g", "g.id", "p.group_id")
			.select(
				"p.id",
				"u.id as user_id",
				"p.group_id",
				"g.group_name",
				"g.acronym",
				"g.image as group_image",
				"p.post_content",
				"p.created_at",
				"p.updated_at",
				"u.first_name",
				"u.last_name",
				"u.image as user_image"
			)
			.where("p.created_at", ">=", ts)
			.whereIn("p.group_id", filters.group_id);
	} else {
		// if single group is received, use where
		return db("posts as p")
			.leftJoin("users as u", "u.id", "p.user_id")
			.leftJoin("groups as g", "g.id", "p.group_id")
			.select(
				"p.id",
				"u.id as user_id",
				"p.group_id",
				"g.group_name",
				"g.acronym",
				"g.image as group_image",
				"p.post_content",
				"p.created_at",
				"p.updated_at",
				"u.first_name",
				"u.last_name",
				"u.image as user_image"
			)
			.where("p.created_at", ">=", ts)
			.where("p.group_id", filters.group_id);
	}
}

function findReplies(filters) {
	// Set interval as number of hours
	const n = filters.interval;
	// Use moment js to convert desired start time for retrieval of data
	const ts = moment(Date.now()).subtract(n, "hours");
	// If multiple groups are received, use whereIn
	if (Array.isArray(filters.group_id)) {
		return db("replies as r")
			.leftJoin("users as u", "u.id", "r.user_id")
			.leftJoin("posts as p", "p.id", "r.post_id")
			.leftJoin("groups as g", "g.id", "p.group_id")
			.select(
				"r.id",
				"p.group_id",
				"g.group_name",
				"g.acronym",
				"g.image as group_image",
				"u.id as user_id",
				"r.post_id",
				"p.post_content",
				"r.reply_content",
				"r.created_at",
				"r.updated_at",
				"u.first_name",
				"u.last_name",
				"u.image as user_image"
			)
			.where("r.created_at", ">=", ts)
			.whereIn("p.group_id", filters.group_id);
	} else {
		// if single group is received, use where
		return db("replies as r")
			.leftJoin("users as u", "u.id", "r.user_id")
			.leftJoin("posts as p", "p.id", "r.post_id")
			.leftJoin("groups as g", "g.id", "p.group_id")
			.select(
				"r.id",
				"p.group_id",
				"g.group_name",
				"g.acronym",
				"g.image as group_image",
				"u.id as user_id",
				"r.post_id",
				"p.post_content",
				"r.reply_content",
				"r.created_at",
				"r.updated_at",
				"u.first_name",
				"u.last_name",
				"u.image as user_image"
			)
			.where("r.created_at", ">=", ts)
			.where("p.group_id", filters.group_id);
	}
}

function findPostLikes(filters) {
	// Set interval as number of hours
	const n = filters.interval;
	// Use moment js to convert desired start time for retrieval of data
	const ts = moment(Date.now()).subtract(n, "hours");
	// If multiple groups are received, use whereIn
	if (Array.isArray(filters.group_id)) {
		return (
			db("posts_likes as p_l")
				// liker shares user_id with postLikes table
				.leftJoin("users as liker", "liker.id", "p_l.user_id")
				.leftJoin("posts as p", "p.id", "p_l.post_id")
				// poster shares user_id with posts table
				.leftJoin("users as poster", "poster.id", "p.user_id")
				.leftJoin("groups as g", "g.id", "p.group_id")
				.select(
					"p_l.id",
					"p.group_id",
					"g.group_name",
					"g.acronym",
					"g.image as group_image",
					"p.post_content",
					"liker.id as liker_id",
					"poster.id as poster_id",
					"p_l.post_id",
					"p_l.created_at",
					"p_l.updated_at",
					"liker.first_name as liker_first_name",
					"liker.last_name as liker_last_name",
					"liker.image as liker_image",
					"poster.first_name as poster_first_name",
					"poster.last_name as poster_last_name",
					"poster.image as poster_image"
				)
				.where("p_l.created_at", ">=", ts)
				.whereIn("p.group_id", filters.group_id)
		);
	} else {
		// if single group is received, use where
		return (
			db("posts_likes as p_l")
				// liker shares user_id with postLikes table
				.leftJoin("users as liker", "liker.id", "p_l.user_id")
				.leftJoin("posts as p", "p.id", "p_l.post_id")
				// poster shares user_id with posts table
				.leftJoin("users as poster", "poster.id", "p.user_id")
				.leftJoin("groups as g", "g.id", "p.group_id")
				.select(
					"p_l.id",
					"p.group_id",
					"g.group_name",
					"g.acronym",
					"g.image as group_image",
					"p.post_content",
					"liker.id as liker_id",
					"poster.id as poster_id",
					"p_l.post_id",
					"p_l.created_at",
					"p_l.updated_at",
					"liker.first_name as liker_first_name",
					"liker.last_name as liker_last_name",
					"liker.image as liker_image",
					"poster.first_name as poster_first_name",
					"poster.last_name as poster_last_name",
					"poster.image as poster_image"
				)
				.where("p_l.created_at", ">=", ts)
				.where("p.group_id", filters.group_id)
		);
	}
}

function findReplyLikes(filters) {
	// Set interval as number of hours
	const n = filters.interval;
	// Use moment js to convert desired start time for retrieval of data
	const ts = moment(Date.now()).subtract(n, "hours");
	// If multiple groups are received, use whereIn
	if (Array.isArray(filters.group_id)) {
		return (
			db("replies_likes as r_l")
				// liker shares user_id with replyLikes table
				.leftJoin("users as liker", "liker.id", "r_l.user_id")
				.leftJoin("replies as r", "r.id", "r_l.reply_id")
				// replier shares user_id with replies table
				.leftJoin("users as replier", "replier.id", "r.user_id")
				.leftJoin("posts as p", "p.id", "r.post_id")
				.leftJoin("groups as g", "g.id", "p.group_id")
				.select(
					"r_l.id",
					"p.group_id",
					"g.group_name",
					"g.acronym",
					"g.image as group_image",
					"r.post_id",
					"p.post_content",
					"r.reply_content",
					"liker.id as liker_id",
					"replier.id as replier_id",
					"r_l.reply_id",
					"r_l.created_at",
					"r_l.updated_at",
					"liker.first_name as liker_first_name",
					"liker.last_name as liker_last_name",
					"liker.image as liker_image",
					"replier.first_name as replier_first_name",
					"replier.last_name as replier_last_name",
					"replier.image as replier_image"
				)
				.where("r_l.created_at", ">=", ts)
				.whereIn("p.group_id", filters.group_id)
		);
	} else {
		// if single group is received, use where
		return (
			db("replies_likes as r_l")
				// liker shares user_id with replyLikes table
				.leftJoin("users as liker", "liker.id", "r_l.user_id")
				.leftJoin("replies as r", "r.id", "r_l.reply_id")
				// replier shares user_id with replies table
				.leftJoin("users as replier", "replier.id", "r.user_id")
				.leftJoin("posts as p", "p.id", "r.post_id")
				.leftJoin("groups as g", "g.id", "p.group_id")
				.select(
					"r_l.id",
					"p.group_id",
					"g.group_name",
					"g.acronym",
					"g.image as group_image",
					"r.post_id",
					"p.post_content",
					"r.reply_content",
					"liker.id as liker_id",
					"replier.id as replier_id",
					"r_l.reply_id",
					"r_l.created_at",
					"r_l.updated_at",
					"liker.first_name as liker_first_name",
					"liker.last_name as liker_last_name",
					"liker.image as liker_image",
					"replier.first_name as replier_first_name",
					"replier.last_name as replier_last_name",
					"replier.image as replier_image"
				)
				.where("r_l.created_at", ">=", ts)
				.where("p.group_id", filters.group_id)
		);
	}
}
