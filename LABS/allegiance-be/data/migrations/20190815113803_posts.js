exports.up = function(knex) {
  return knex.schema.createTable("posts", posts => {
    posts.increments();

    posts
      .integer("group_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    posts
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    posts.varchar("post_content").notNullable();
    posts.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts");
};
