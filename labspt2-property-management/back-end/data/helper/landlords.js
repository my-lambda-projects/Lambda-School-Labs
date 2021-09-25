const db = require("../../knex");

module.exports = {
  create,
  getById,
  getByEmail,
  editById,
  get,
  deleteById
};

function create(landlord) {
  return db("landlords").insert(landlord);
}

function getByEmail(email) {
  return db("landlords")
    .where({ email })
    .first();
}

function getById(id) {
  return db("landlords")
    .where({ id })
    .first();
}

function editById(id, landlord) {
  return db("landlords")
    .where({ id })
    .update(landlord);
}

function get() {
  return db("landlords");
}

function deleteById(id) {
  return db("landlords")
    .where({ id })
    .first()
    .del();
}
