exports.up = function(knex, Promise) {
    return knex.schema.createTable("Questions", function(table) {
        table.increments();
        table
            .integer("rounds_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("Rounds");
        table.string("category").notNullable();
        table.string("difficulty").notNullable();
        table.string("type").notNullable();
        table.text("question").notNullable();
        table.string("correct_answer").notNullable();
        table.string("incorrect_answers").notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("Questions");
};
