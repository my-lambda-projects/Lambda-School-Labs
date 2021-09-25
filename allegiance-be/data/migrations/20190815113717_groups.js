exports.up = function(knex) {
  return knex.schema.createTable("groups", groups => {
    groups.increments();

    groups.string("group_name", 50).notNullable();
    groups.string("privacy_setting").notNullable();
    groups
      .string("location")
      .notNullable()
      .comment("This is the location field");
    groups
      .integer("creator_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    groups.text("image");
    groups.string("acronym", 4);
    groups.string("description", 20);
    groups.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("groups");
};
