exports.up = function(knex, Promise) {
  return knex.schema.createTable("education", function(table) {
    table.increments();
    table.string("school")
      .notNullable();
    table.string("school_dates");
    table.string("degree");
    table.string("course");
    table.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("education");
};
