exports.up = function (knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('email', 128)
      .notNullable()
      .unique();
    users.string('password', 128).notNullable();
    users.string("firstName");
    users.string("lastName");
    users.string("userName");
    users.integer("age");
    users.string("googleId").unique();
    users.string("googleEmail");
    users.string("facebookId").unique();
    users.string("facebookEmail");
    users.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
