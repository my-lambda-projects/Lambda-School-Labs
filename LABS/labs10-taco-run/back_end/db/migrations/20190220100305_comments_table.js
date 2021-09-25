exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(tbl) {
    tbl.increments()

    tbl
      .string('content', 300)
      .notNullable()

    tbl
      .string('posted_by', 128)
      .notNullable()

    tbl
      .string('posters_pic')

    tbl
      .string('posters_email', 128)
      .notNullable()

    tbl
      .string('date', 128)
      .notNullable()

    tbl
      .string('pic_url')

    tbl
      .integer('event_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE')


  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};