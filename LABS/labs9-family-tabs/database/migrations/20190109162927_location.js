
exports.up = function(knex, Promise) {
    return knex.schema.createTable('location', location => {
        location
          .increments()
          .notNullable()

        location
          .string('location_name', 128)
          .notNullable()

        location
          .string('address', 128)

          
        location
          .integer('familyID')
          .references('family.id')
          .notNullable()
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('location');
};
