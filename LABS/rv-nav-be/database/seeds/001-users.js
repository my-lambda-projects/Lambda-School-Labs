const bcrypt = require('bcryptjs');
exports.seed = function (knex) {

  // Inserts seed entries
  return knex('users').insert([
    {
      password: bcrypt.hashSync('password123', 10),
      email: 'selena.gomez@sample.com'
    }
  ]);
};
