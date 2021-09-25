exports.up = function(knex, Promise) {
    return knex.schema.createTable("Games", function(table) {
        table.increments();
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("Users");
        table.string("name").notNullable();
        table.text("description");
        table.timestamp("date_created").defaultTo(knex.fn.now());
        table.timestamp("date_played").defaultTo(null);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("Games");
};
