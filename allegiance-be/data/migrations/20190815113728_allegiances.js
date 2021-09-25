exports.up = function(knex) {
  return knex.schema.createTable("allegiances", allegiances => {
    allegiances.increments();

    allegiances.string("allegiance_name").notNullable();
    allegiances.string("image", 999);
    allegiances.string("banner_image", 999);
    allegiances.string("sport");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("allegiances");
};
