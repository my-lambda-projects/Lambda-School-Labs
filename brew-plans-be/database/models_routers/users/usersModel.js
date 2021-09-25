const db = require('../../dbConfig.js');


module.exports = {
    findAllUsers,
    findById,
    add,
    removeUser,
    findByEmail,
    FindByUsername
  };
  
  function findAllUsers() {
    return db('users');
  }
  
  function findById(id) {
    return db('users')
      .where({ id })
      .first();
}

function add(user) {
  return db('users').insert(user, 'id')
 }
 
//  .then((id) => {
//   //  console.log(user, id);
//   //  return findById(id[0]);
//  })

  function removeUser(id) {
    return db('users')
      .where({ id })
      .del()
}

    
function findByEmail(email) {
  return db('users')
    .where({ email })
    .first();
}

function FindByUsername(username) {
  return db('users')
    .where({ username })
    .first();
}
 