exports.up = function(knex) {
  return knex.schema.createTable("users", function(users) {
    users.increments("internal_id").primary(); // create table 'users' with a primary key using 'increments()
    users
      .string("username", 128)      
      .unique();
    users
      .string("name", 128)    
    users.string("email", 128).notNullable();
    users.integer("ext_user_id").unique();
    users.string("photoURL")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
