exports.up = function(knex) {
  return knex.schema.createTable('route_features', tbl => {
    tbl.increments();
    tbl.float('lat');
    tbl.float('lon');
    tbl.string('road_feature', 255);
    tbl.string('route_name', 255);
    tbl.text('description');
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('route_features');
};
