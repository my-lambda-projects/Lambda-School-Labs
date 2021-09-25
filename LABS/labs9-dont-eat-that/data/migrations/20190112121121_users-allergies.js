exports.up = function(knex, Promise) {
  return knex.schema.createTable('users-allergies', tbl => {
    tbl.increments();
    tbl.integer('user_id').references('users.id');
    tbl.integer('allergy_id').references('allergies.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users-allergies');
};
