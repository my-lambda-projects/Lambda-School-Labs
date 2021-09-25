exports.up = function(knex) {
  return knex.schema.createTable("vehicle", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.string("name").notNullable();
    tbl.float("height");
    tbl.float("width");
    tbl.float("length");
    tbl.float("weight");
    tbl.integer("axel_count");
    tbl.string("vehicle_class", 255);
    tbl.timestamps(true, true);
    tbl.boolean("dual_tires");
    tbl.boolean("trailer");
    tbl.boolean("DirtRoads");
    tbl.boolean("SteepGrade");
    tbl.boolean("Potholes");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("vehicle");
};
