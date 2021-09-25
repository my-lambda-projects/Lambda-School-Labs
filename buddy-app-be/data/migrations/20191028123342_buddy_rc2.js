exports.up = function(knex) {
  return knex.schema.createTable("activities", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string("notes", 1000);
    tbl.string("date", 128).notNullable();
    tbl.string("time", 128).notNullable();
    tbl.integer("guest_limit");
    tbl
      .integer("organizer_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("interest_id")
      .notNullable()
      .references("id")
      .inTable("interests")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.string("location", 128);
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("activity_interests")
    .dropTableIfExists("activities")
    .dropTableIfExists("user_interests")
    .dropTableIfExists("interests")
    .dropTableIfExists("users");
};
