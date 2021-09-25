exports.up = function(knex, Promise) {
  return knex.schema.createTable("experience", function(table) {
    table.increments();
    table.string("job_title")
      .notNullable();
    table.string("job_dates");
    table.string("job_description", 1000);
    table.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("experience");
};
