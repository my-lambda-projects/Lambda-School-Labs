exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 256)
      .notNullable()
      .unique();
    users
      .string("email", 255)
      .notNullable()
      .unique()
      .comment("This is the email field");
    users.string("location").comment("This is the location field");
    users.string("image", 999);
    users.string("banner_image");
    users.text("bio", 999);
    users.string("first_name", 255);
    users.string("last_name", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
