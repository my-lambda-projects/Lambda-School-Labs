
exports.up = function(knex) {
    return knex.schema.createTable('user_locations', user_locations => {
        user_locations.increments();
        user_locations
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        user_locations
            .integer('location_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('locations')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        user_locations.string('comment', 400);
        
 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_locations')
};
