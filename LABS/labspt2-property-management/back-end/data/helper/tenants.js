const db = require("../../knex");

module.exports = {
  create,
  getById,
  getByEmail,
  editById,
  get,
  deleteById,
  getByLandlordId
};

function create(tenant) {
  return db("tenants").insert(tenant);
}

function getByEmail(email) {
  return db("tenants")
    .where({ email })
    .first();
}

function getById(id) {
  return db("tenants")
    .where({ id })
    .first();
}

function editById(id, tenant) {
  return db("tenants")
    .where({ id })
    .update(tenant);
}

function get() {
  return db("tenants");
}

function deleteById(id) {
  return db("tenants")
    .where({ id })
    .first()
    .del();
}

function getByLandlordId(landlord) {
  console.log(landlord);
  return db("tenants").where({ landlord });
}
