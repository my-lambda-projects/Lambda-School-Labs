const db = require("../../data/dbconfig");

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};

function getUsers() {
  return db("users").select(
    "id",
    "first_name",
    "last_name",
    "location",
    "email"
  );
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function updateUser(id, user) {
  return db("users")
    .where({ id })
    .update(user)
    .then(res => {
      return getUserById(id).then(updatedUser => updatedUser);
    });
}

function deleteUser(id) {
  return db("users")
    .where({ id })
    .del();
}
