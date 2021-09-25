const db = require("../data/db-config");

module.exports = {
  add,
  find,
  remove
};

function add(group_allegiance) {
  return (
    db("groups_allegiances")
      // allegiance_id, group_id required
      .insert(group_allegiance, ["*"])
      .then(g_a => find({ "g_a.id": g_a[0].id }).first())
  );
}

function find(filters) {
  if (filters) {
    return db("groups_allegiances as g_a")
      .leftJoin("allegiances as a", { "a.id": "g_a.allegiance_id" })
      .leftJoin("groups as g", { "g.id": "g_a.group_id" })
      .where(filters)
      .select(
        "g_a.id as id",
        "g.id as group_id",
        "group_name",
        "a.id as allegiance_id",
        "a.allegiance_name as allegiance_name",
        "a.image as allegiance_image",
        "a.sport as sport"
      );
  } else {
    return db("groups_allegiances as g_a")
      .leftJoin("allegiances as a", { "a.id": "g_a.allegiance_id" })
      .leftJoin("groups as g", { "g.id": "g_a.group_id" })
      .select(
        "g_a.id as id",
        "g.id as group_id",
        "group_name",
        "a.id as allegiance_id",
        "a.allegiance_name as allegiance_name",
        "a.image as allegiance_image",
        "a.sport as sport"
      );
  }
}

function remove(filter) {
  // only returns the number of deleted entries
  return db("groups_allegiances")
    .where(filter)
    .del();
}
