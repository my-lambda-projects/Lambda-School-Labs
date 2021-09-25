
exports.up = function(knex, Promise) {
  return knex.schema.createTable('versions', table => {
    table.increments()
    table.text('text')
      .notNullable()
    table.json('tone_analysis')
    table.timestamp('date_created').defaultTo(knex.fn.now()).notNullable()
    table.integer('email_id')
      .references('id')
      .inTable('emails')
      .notNullable()
      .unsigned()
  })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('versions'); 
};
