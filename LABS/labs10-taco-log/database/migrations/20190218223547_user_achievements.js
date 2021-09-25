exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_achievements", function(tbl) {
    tbl.increments("id"); // id,
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("internal_Id")
      .inTable("users");
    tbl
      .integer("achievement_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("achievements");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user_achievements");
};
