
exports.up = function(knex, Promise) {
  return knex.schema.createTable('emails', table => {
    table.increments()
    table
      .string('title', 128).notNullable()
    table
      .string('addressee', 128).notNullable()
    table
      .timestamp('date_created').defaultTo(knex.fn.now()).notNullable()
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('emails');
};
