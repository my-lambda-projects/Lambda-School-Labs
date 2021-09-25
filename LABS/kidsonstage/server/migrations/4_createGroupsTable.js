exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', function(tbl) {
    tbl.increments('id').primary(); // primary key
    tbl
      .integer('eventId')
      .references('id')
      .inTable('events')
      .onDelete('CASCADE');
    tbl.string('name', 100).notNullable();
    tbl.time('time').notNullable();
    tbl
      .boolean('completed')
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('groups');
};
