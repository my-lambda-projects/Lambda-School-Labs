const db = require("../../dbConfig");

module.exports = {
  findAll,
  findByUser,
  add,
  update,
  remove
};

function findAll() {
  return db("logs");
}

function findByUser(userString) {
  return db("logs").where({ userString });
}

async function add(log) {
  return await db("logs").insert(log);
}

async function update(log_id, changes) {
  return await db("logs")
    .where({ id: log_id })
    .update(changes);
}

async function remove(log_id) {
  return db("logs")
    .where({ id: log_id })
    .del();
}
