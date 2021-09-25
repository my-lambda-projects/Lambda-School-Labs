const db = require("../../knex");

module.exports = {
  getContracts,
  getContract,
  createContract,
  deleteContract,
  editContract,
  getContractsByHouseId
};

function getContracts() {
  return db("contracts");
}

function getContract(id) {
  return db("contracts")
    .where({ id })
    .first();
}

function createContract(contract) {
  return db("contracts").insert(contract, "id");
}

function deleteContract(id) {
  return db("contracts")
    .where({ id })
    .del();
}

function editContract(id, contract) {
  return db("contracts")
    .where({ id })
    .update(contract, "id");
}

function getContractsByHouseId(houseId) {
  return db("contracts").where({ houseId });
}
