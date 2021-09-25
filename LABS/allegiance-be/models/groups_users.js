const db = require("../data/db-config");

module.exports = {
  add,
  find,
  update,
  remove
};

function add(group_user) {
  return (
    db("groups_users")
      // user_id, user_type, group_id required
      .insert(group_user, ["*"])
      .then(g_u => find({ "g_u.id": g_u[0].id }).first())
  );
}

function find(filters) {
  if (filters) {
    if (Array.isArray(filters.group_id)) {
      return db("groups_users as g_u")
        .leftJoin("users as u", "u.id", "g_u.user_id")
        .leftJoin("groups as g", "g.id", "g_u.group_id")
        .select(
          "g_u.id",
          "u.id as user_id",
          "u.first_name",
          "u.last_name",
          "u.username",
          "u.email",
          "u.location as user_location",
          "u.image as user_image",
          "g_u.user_type",
          "g.id as group_id",
          "g.group_name",
          "g.creator_id",
          "g.privacy_setting",
          "g.location as group_location",
          "g.image as group_image",
          "g_u.created_at",
          "g_u.updated_at"
        )
        .whereIn("group_id", filters.group_id);
    } else {
      return db("groups_users as g_u")
        .leftJoin("users as u", "u.id", "g_u.user_id")
        .leftJoin("groups as g", "g.id", "g_u.group_id")
        .where(filters)
        .select(
          "g_u.id",
          "u.id as user_id",
          "u.first_name",
          "u.last_name",
          "u.username",
          "u.email",
          "u.location as user_location",
          "u.image as user_image",
          "g_u.user_type",
          "g.id as group_id",
          "g.group_name",
          "g.creator_id",
          "g.privacy_setting",
          "g.location as group_location",
          "g.image as group_image",
          "g_u.created_at",
          "g_u.updated_at"
        );
    }
  } else {
    return db("groups_users as g_u")
      .leftJoin("users as u", "u.id", "g_u.user_id")
      .leftJoin("groups as g", "g.id", "g_u.group_id")
      .select(
        "g_u.id",
        "u.id as user_id",
        "u.username",
        "u.email",
        "u.location as user_location",
        "u.first_name",
        "u.last_name",
        "u.image as user_image",
        "g_u.user_type",
        "g.id as group_id",
        "g.group_name",
        "g.privacy_setting",
        "g.location as group_location",
        "g.creator_id",
        "g.image as group_image",
        "g_u.created_at",
        "g_u.updated_at"
      );
  }
}

function update(filter, changes) {
  // only allow one update at a time, so uses .first()
  return db("groups_users")
    .update(changes, ["*"])
    .where(filter)
    .then(g_u =>
      find({
        "g_u.id": g_u[0].id
      }).first()
    );
}

function remove(filter) {
  // only returns the number of deleted entries
  return db("groups_users")
    .where(filter)
    .del();
}
