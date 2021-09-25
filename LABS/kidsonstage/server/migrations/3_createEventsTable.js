exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(tbl) {
    tbl.increments('id')
      .primary(); // primary key
    tbl
      .integer('owner')
      .references('id')
      .inTable('users');
    tbl.string('inviteCode');
    tbl.string('title', 100).notNullable();
    tbl.dateTime('eventDate').notNullable();
    tbl
      .boolean('activated')
      .notNullable()
      .defaultTo(false);
    tbl
      .boolean('completed')
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events');
};
