
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', user => {
        user
          .increments()
          .notNullable()

        user
          .string('userName', 128)
          .notNullable()

        user
          .string('phone', 128)
          .notNullable()

        user
          .string('email', 128)
          .notNullable()

        user
          .boolean('isAdmin')
          .notNullable()

        user
          .integer('familyID')
          .references('family.id')
          .notNullable()
        
        user
          .boolean('textCheckbox')
          .notNullable()
          .defaultTo(false)
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user');
};
