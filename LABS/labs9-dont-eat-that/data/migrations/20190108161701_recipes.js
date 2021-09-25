
exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments();
    tbl
        .string('name', 127)
        .notNullable();
    tbl
        .text('description')
        .notNullable();
    tbl
        .string('imageUrl')
    tbl
        .integer('user_id')
        .references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("recipes");
};
