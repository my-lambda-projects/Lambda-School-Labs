exports.up = function(knex, Promise) {
  return knex.schema.createTable("exercises", table => {
    table.increments();
    table.string("exerciseName").notNullable();
    table.string("reps").notNullable();
    table.string("weight").notNullable();
    table.string("sets").notNullable();
    table
      .integer("categoryId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("categories");
    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("exercises");
};
