
exports.up = function(knex) {
    return knex.schema.createTable('event_group', (tbl) => {
        tbl.increments('id');
        tbl.integer('eventId')
            .references('id')
            .inTable('templates')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.integer('groupId')
            .references('id')
            .inTable('groups')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('event_group');
};
