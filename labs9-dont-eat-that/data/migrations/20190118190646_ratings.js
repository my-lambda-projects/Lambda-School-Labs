exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', tbl => {
    tbl.increments();
    tbl.integer('rating');
    tbl.integer('user_id').references('users.id');
    tbl.integer('recipe_id').references('recipes.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ratings');
};
