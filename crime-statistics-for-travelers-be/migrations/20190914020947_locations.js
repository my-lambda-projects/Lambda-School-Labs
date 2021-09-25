
exports.up = function(knex) {
    return knex.schema.createTable('locations', (locations) => {
        locations.increments();
        locations.bigInteger('latitude');
        locations.bigInteger('longitude');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('locations')
};
