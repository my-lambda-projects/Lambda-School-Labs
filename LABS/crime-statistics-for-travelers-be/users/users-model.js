const db = require('../config/db-config');


module.exports = {
  getUsers,
  find,
  add,
  findBy,
  findById,
  addUser,
  updateUser,
  deleteUser
};

function find() {
  return db.select('*').from('users');
//   return db('users').select('id', 'username', 'password');
// }
}
function findBy(filter) {
	return db('users').where(filter);
}

async function add(user) {
  console.log(user,"25")
	const [ id ] = await db('users').insert(user);
console.log(user,"26")
	return findById(id);
}

function findById(id) {
	return db('users').where({ id }).first();
}
function getUsers() {
  return db("users");
}

function addUser(newUser) {
  return db("users").insert(newUser, "id");
}

function updateUser(changes, id) {
  return db("users")
    .update(changes)
    .where({ id });
}

function deleteUser(id) {
  return db("users")
    .del()
    .where({ id });
}