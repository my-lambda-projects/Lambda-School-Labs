exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    table.increments();
    table.integer('weight').notNullable();
    table.integer('waist');
    table.integer('arms');
    table.integer('legs');
    table
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
