exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments('id').primary(); // primary key
    tbl
      .dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.fn.now());
    tbl
      .integer('userClass')
      .references('id')
      .inTable('userClass')
      .defaultTo('1');
    tbl
      .string('username', 32)
      .notNullable()
      .unique('username');
    tbl.text('password').notNullable();
    tbl.string('email', 70).notNullable();
    tbl.string('phoneNumber', 12);
    tbl.string('vcode', 8).notNullable();
    tbl.boolean('validated').defaultTo(false);
    tbl.boolean('byEmail').defaultTo(false);
    tbl.boolean('byPhone').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
