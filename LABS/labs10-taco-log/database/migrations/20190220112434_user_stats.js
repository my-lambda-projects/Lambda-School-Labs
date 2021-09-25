exports.up = function(knex) {
  return knex.schema.createTable("user_stats", function(tbl) {
    tbl.increments("id");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("internal_id")
      .inTable("users"); // id,
    tbl.integer("tacos_logged").defaultTo(0);
    tbl.string("meats_logged")
    tbl.string("cheese_logged")
    tbl.string("salsa_logged")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user_stats");
};
