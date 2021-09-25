exports.up = function(knex) {
  return knex.schema.createTable("achievements", function(tacTable) {
    tacTable.increments("id"); // id,
    tacTable.string("title").unique();
    tacTable.string("description").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("achievements");
};
