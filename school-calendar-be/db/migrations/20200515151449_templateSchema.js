
exports.up = function(knex) {
  return knex.schema.createTable('templates', (tbl) => {
    tbl.increments('id');
    tbl.string('title', 128)
        .notNullable();
    tbl.text('notes');
    tbl.string('starttime', 8)
        .notNullable();
    tbl.string('endtime', 8)
        .notNullable();
    tbl.string('googleId', 32)
        .notNullable();         
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('templates');
};
