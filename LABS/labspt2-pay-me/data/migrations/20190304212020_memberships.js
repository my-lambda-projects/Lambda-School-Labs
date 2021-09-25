
exports.up = function(knex, Promise) {
  return knex.schema.createTable('memberships', memberships =>{
    memberships.increments();
    memberships.string('plan').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('memberships')
};
