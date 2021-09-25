
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users =>{
    users.increments();
    users.string('username', 128 ).notNullable().unique();
    users.string('password', 128).notNullable();
    users.string('email').notNullable().unique();
    users.integer('membership_id').unsigned().notNullable().references('id').inTable('memberships');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
