exports.up = function(knex, Promise) {
  return knex.schema.createTable("contracts", table => {
    table.increments();
    table
      .integer("tenant")
      .notNullable()
      .references("id")
      .inTable("tenants");
    table
      .string("tenantEmail")
      .notNullable()
      .references("email")
      .inTable("tenants");
    table
      .integer("property")
      .notNullable()
      .references("id")
      .inTable("properties");
    table.string("startDate").notNullable();
    table.text("endDate").notNullable();
    table.text("rent").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("contracts");
};
