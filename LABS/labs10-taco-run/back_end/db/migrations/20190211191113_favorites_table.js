exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(tbl) {
    tbl.increments()

    tbl
      .string('name', 128)
      .notNullable()

    tbl
      .string('location', 128)
      .notNullable()

    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites')
};