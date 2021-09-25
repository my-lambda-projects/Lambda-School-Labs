exports.up = function(knex, Promise) {
  return knex.schema.createTable('userClass', function(tbl) {
    tbl.increments('id').primary(); // primary key

    tbl
      .string('className', 32)
      .notNullable()
      .unique('className');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('userClass');
};
