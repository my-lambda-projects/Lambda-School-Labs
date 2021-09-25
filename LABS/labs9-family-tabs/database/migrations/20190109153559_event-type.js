
exports.up = function(knex, Promise) {
    return knex.schema.createTable('eventType', eventType => {
        eventType
          .increments()
          .notNullable()

        eventType
          .string('eventType_name', 128)
          .notNullable()

        eventType
          .integer('familyID')
          .references('family.id')
          .notNullable()
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('eventType');
};
