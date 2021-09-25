exports.up = function(knex) {
  return knex.schema.createTable("trips", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("poi_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("points_of_interest")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.float("lat_start", 4);
    tbl.float("lon_start", 4);
    tbl.float("lat_end", 4);
    tbl.float("lon_end", 4);
    tbl.timestamps(true, true);
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("trips");
};
