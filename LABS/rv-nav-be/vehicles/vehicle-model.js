const db = require("../database/dbconfig.js");

module.exports = {
  add,
  deleteVehicle,
  findById,
  findBy,
  findUsersVehicles,
  updateVehicle
};

async function add(vehicle) {
  console.log("Made it!");
  const response = await db("vehicle").insert(vehicle);
  console.log("add response", vehicle);
  return vehicle;
  // return db("vehicle").insert(vehicle);
}

function findBy(filter) {
  return db("vehicle").where(filter);
}

function findById(id) {
  return db("vehicle").where({ id: id });
}

async function findUsersVehicles(user_id) {
  console.log("u here bro?", user_id);
  const cars = await db("vehicle").where({ user_id: user_id });
  return cars;
}

function updateVehicle(id, changedVehicle) {
  return db("vehicle")
    .where({ id })
    .update(changedVehicle);
}

function deleteVehicle(id) {
  return db("vehicle")
    .where({ id })
    .del();
}
