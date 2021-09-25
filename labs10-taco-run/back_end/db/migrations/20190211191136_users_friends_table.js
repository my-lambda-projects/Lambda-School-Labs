exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_friends', function(tbl) {
    tbl.increments()

	  tbl
  		.integer('user_id')
  		.unsigned()
  		.notNullable()
  		.references('id')
  		.inTable('users')
      .onDelete('CASCADE')


  	tbl
  		.integer('friends_id')
  		.unsigned()
  		.notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_friends')
};