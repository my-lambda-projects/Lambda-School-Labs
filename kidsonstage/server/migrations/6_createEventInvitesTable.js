exports.up = function(knex, Promise) {
  return knex.schema.createTable('eventInvites', function(tbl) {
    tbl.increments('id').primary(); // primary key
    tbl
      .integer('eventId')
      .references('id')
      .inTable('events')
      .onDelete('CASCADE');
    tbl
      .integer('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('eventInvites');
};
