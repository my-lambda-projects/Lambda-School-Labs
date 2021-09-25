exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_events', function(tbl) {
    tbl.increments()

	  tbl
  		.integer('user_id')
  		.unsigned()
  		.notNullable()
  		.references('id')
  		.inTable('users')
      .onDelete('CASCADE')

  	tbl
  		.integer('event_id')
  		.unsigned()
  		.notNullable()
  		.references('id')
  		.inTable('events')
      .onDelete('CASCADE')

    tbl
      .boolean('isPending')
      .defaultTo(true)

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_events')
};