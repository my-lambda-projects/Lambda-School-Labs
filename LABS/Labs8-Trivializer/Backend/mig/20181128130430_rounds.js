exports.up = function(knex, Promise) {
    return knex.schema.createTable("Rounds", function(table) {
        table.increments();
        table
            .integer("game_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("Games");
        table.string("name").notNullable();
        table
            .integer("number_of_questions")
            .unsigned()
            .notNullable();
        table.string("category").notNullable();
        table.string("difficulty").notNullable();
        table.string("type").notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("Rounds");
};
