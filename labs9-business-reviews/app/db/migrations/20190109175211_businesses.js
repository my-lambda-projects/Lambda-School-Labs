exports.up = function(knex, Promise) {
  return knex.schema.createTable('businesses', business => {
    business.string('id', 1000).unique();
    business.string('name').notNullable();
    business.float('rating', 2, 1);
    business.string('image', 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('businesses');
};
