const db = require("../data/db-config");

module.exports = {
  add,
  find,
  update,
  remove
};

function add(allegiance) {
  return db("allegiances")
    .insert(allegiance, ["*"])
    .then(a => find({ id: a[0].id }).first());
}

function find(filters) {
  // if filters were passed in, search by filter. otherwise return all
  // note that neither return use the .first() method -- it's on a use-by-use basis if that is required or not
  if (filters) {
    return db("allegiances")
      .select("id", "allegiance_name", "sport", "image", "banner_image")
      .where(filters);
  }
  return db("allegiances").select(
    "id",
    "allegiance_name",
    "sport",
    "image",
    "banner_image"
  );
}

function update(filter, changes) {
  // only allow one update at a time, so uses .first()
  return db("allegiances")
    .update(changes, "*")
    .where(filter)
    .then(a => find({ id: a[0].id }).first());
}

function remove(filter) {
  // only returns the number of deleted entries
  return db("allegiances")
    .where(filter)
    .del();
}
