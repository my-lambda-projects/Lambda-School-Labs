exports.up = function(knex) {
  return knex.schema.createTable("notifications", notifications => {
    notifications.increments();

    notifications
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    notifications
      .integer("invoker_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    notifications
      .integer("type_id")
      .unsigned()
      .notNullable();

    notifications.string("type").notNullable();

    notifications.boolean("read").default(false);

    notifications.timestamps(true, true);

    // notifications.unique(["invoker_id", "type_id", "type"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notifications");
};
