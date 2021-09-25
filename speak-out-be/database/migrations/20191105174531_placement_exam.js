
exports.up = function (knex) {
    return knex.schema
        .createTable("placement_exam", table => {
            table.increments();
            table
                .integer("student_id")
                .unsigned()
                .references("id")
                .inTable("student")
                .onDelete("CASCADE")
                .onUpdate("CASCADE")
                .index();
            table.integer('test_type').notNullable().comment("1 for online, 2 for oral");
            table.date('test_date');
            table.text('test');
            table
                .integer("level_id")
                .unsigned()
                .references("id")
                .inTable("level")
                .onDelete("CASCADE")
                .onUpdate("CASCADE")
                .index()
                .defaultTo(1);
            table.integer('fluency').defaultTo(null);
            table.integer('accuracy').defaultTo(null);
            table.integer('comprehension').defaultTo(null);
            table.integer('writing_level').defaultTo(null);
            table.integer('mc_correct').defaultTo(null);
            table.integer('mc_marked').defaultTo(null);
            table.text('answers').defaultTo(null);
            table.text('notes');
            table.timestamps(true, true);
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("placement_exam");
};
