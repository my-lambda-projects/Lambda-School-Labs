exports.up = function(knex) {
  return knex.schema.createTable("posts_likes", likes => {
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
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    likes.timestamps(true, true);

    likes.unique(["user_id", "post_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts_likes");
};
