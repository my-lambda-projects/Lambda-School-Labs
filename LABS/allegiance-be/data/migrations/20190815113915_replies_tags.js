exports.up = function(knex) {
  return knex.schema.createTable("replies_tags", tags => {
    tags.increments();

    tags
      .integer("reply_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("replies")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tags
      .integer("tagged_user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("replies_tags");
};
