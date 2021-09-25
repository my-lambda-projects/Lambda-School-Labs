const db = require("../data/db-config");

module.exports = {
  add,
  find,
  update,
  remove
};

function add(user) {
  return db("users")
    .insert(user, ["*"])
    .then(u =>
      find({
        id: u[0].id
      }).first()
    );
}

function find(filters) {
  // if filters were passed in, search by filter. otherwise return all
  // note that neither return use the .first() method -- it's on a use-by-use basis if that is required or not
  if (filters) {
    return db("users")
      .select(
        "id",
        "username",
        "location",
        "email",
        "image",
        "banner_image",
        "bio",
        "first_name",
        "last_name",
        "notification_check"
      )
      .where(filters);
  }
  return db("users").select(
    "id",
    "username",
    "location",
    "email",
    "image",
    "banner_image",
    "bio",
    "first_name",
    "last_name",
    "notification_check"
  );
}

function update(filter, changes) {
  // only allow one update at a time, so uses .first()
  return db("users")
    .update(changes, ["*"])
    .where(filter)
    .then(u =>
      find({
        id: u[0].id
      }).first()
    );
}

function remove(filter) {
  // only returns the number of deleted entries
  return db("users")
    .where(filter)
    .del();
}
