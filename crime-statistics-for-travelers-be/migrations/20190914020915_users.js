
exports.up = function(knex) {
  return knex.schema.createTable('users', (users) => {
      users.increments();
      users.string('username',128).unique();
      users.string('email',128).unique();
      users.string('password',128);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
