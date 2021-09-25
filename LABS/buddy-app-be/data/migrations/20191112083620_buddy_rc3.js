exports.up = function(knex) {
  return knex.schema.createTable("user_activities", tbl => {
    tbl
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("activity_id")
      .notNullable()
      .references("id")
      .inTable("activities")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.primary(["user_id", "activity_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user_activities")
    .dropTableIfExists("activity_interests")
    .dropTableIfExists("activities")
    .dropTableIfExists("user_interests")
    .dropTableIfExists("interests")
    .dropTableIfExists("users");
};
