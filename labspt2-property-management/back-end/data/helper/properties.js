const db = require("../../knex");

module.exports = {
  getByLandlordId,

  get,
  getById,
  create,
  deleteById,
  editById
};

function get() {
  return db("properties");
}

function getById(id) {
  return db("properties")
    .where({ id })
    .first();
}

function getByLandlordId(owner) {
  console.log("landlord", owner);
  return db("properties").where({ owner });
}

function create(property) {
  return db("properties").insert(property);
}

function deleteById(id) {
  return db("properties")
    .where({ id })
    .del();
}

function editById(id, property) {
  console.log(id, property);
  return db("properties")
    .where({ id })
    .update(property);
}
