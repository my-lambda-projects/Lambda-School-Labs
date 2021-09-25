
exports.up = function (knex, Promise) {
    return knex.schema.table('stayssurveys', (table) => {
        table.boolean('is_complete').defaultTo(false);
        table.boolean('is_seen').defaultTo(false);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('stayssurveys', (table) => {
        table.dropColumn('is_complete');
        table.dropColumn('is_seen');
    })
};
