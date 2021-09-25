exports.up = function(knex) {
  return knex.schema.createTable("replies_likes", likes => {
    likes.increments();

    likes
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    likes
      .integer("reply_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("replies")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    likes.timestamps(true, true);

    likes.unique(["user_id", "reply_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("replies_likes");
};
