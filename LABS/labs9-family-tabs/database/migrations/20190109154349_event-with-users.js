exports.up = function(knex, Promise) {
  return knex.schema.createTable("eventWithUsers", eventWithUsers => {

    eventWithUsers
        .increments()
        .notNullable();

    eventWithUsers
        .boolean("isArchived")
        .defaultTo(false);

    eventWithUsers
      .integer("familyID")
      .references("family.id")
      .notNullable();

    eventWithUsers
      .integer("userID")
      .references("user.id")
      .notNullable();

    eventWithUsers
      .integer("scheduledEventID")
      .references("scheduledEvent.id")
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("eventWithUsers");
};
