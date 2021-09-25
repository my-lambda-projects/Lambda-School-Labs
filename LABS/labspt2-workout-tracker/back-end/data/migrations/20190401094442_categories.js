exports.up = function(knex, Promise) {
  return knex.schema.createTable("categories", table => {
    table.increments();
    table.string("categoryName").notNullable();
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
  return knex.schema.dropTableIfExists("categories");
};
