exports.up = function(knex, Promise) {
  return knex.schema.createTable('eventSubscribers', function(tbl) {
    tbl.increments('id').primary(); // primary key
    tbl
      .integer('eventId')
      .references('id')
      .inTable('events')
      .onDelete('CASCADE');
    tbl
      .integer('userId')
      .references('id')
      .inTable('users');
    tbl
      .integer('groupId')
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE');
    tbl.boolean('subscribed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('eventSubscribers');
};
