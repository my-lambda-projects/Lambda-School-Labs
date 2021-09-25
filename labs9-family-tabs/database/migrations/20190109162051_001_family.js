exports.up = function(knex, Promise) {
  return knex.schema.createTable("family", family => {
    family.increments().notNullable();

    family
      .boolean("isSubscribed")
      .notNullable()
      .defaultTo(false);

    family.string("family_name", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("family");
};
