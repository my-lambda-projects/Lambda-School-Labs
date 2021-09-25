exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('subscriber');
    table.dropColumn('password');
  }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.boolean('subscriber');
    table.string('password', 128);
  });
};