exports.up = function(knex) {
  return knex.schema.createTable('points_of_interest', tbl => {
    tbl.increments();
    tbl.float('lat');
    tbl.float('lon');
    tbl.string('name', 255);
    tbl.string('feature', 255);
    tbl.string('type', 255);
    tbl.text('description');
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('points_of_interest');
};
