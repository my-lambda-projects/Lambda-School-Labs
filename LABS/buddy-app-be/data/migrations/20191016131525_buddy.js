exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      // first name
      tbl.string("first_name", 128).notNullable();
      //last_name
      tbl.string("last_name", 128).notNullable();

      // password
      tbl.string("password", 128).notNullable();
      // email
      tbl
        .string("email", 128)
        .notNullable()
        .unique();
      // location
      tbl.string("location", 128);
    })
    .createTable("interests", tbl => {
      tbl.increments();
      tbl.string("name", 128);
    })
    .createTable("user_interests", tbl => {
      tbl
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("interests_id")
        .notNullable()
        .references("id")
        .inTable("interests")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["user_id", "interests_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user_interests")
    .dropTableIfExists("interests")
    .dropTableIfExists("users");
};
