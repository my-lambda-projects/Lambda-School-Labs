exports.up = function(knex, Promise) {
  return knex.schema.table("tenants", table => {
    table
      .integer("landlord_id")
      .references("id")
      .inTable("landlords");
    table
      .integer("property_id")
      .references("id")
      .inTable("properties");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("tenants", table => {
    table
      .integer("landlord_id")
      .references("id")
      .inTable("landlords");
    table
      .integer("property_id")
      .references("id")
      .inTable("properties");
  });
};
