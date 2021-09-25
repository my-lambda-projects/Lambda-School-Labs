exports.up = function(knex) {
    return Promise.all([
      knex.schema.createTable("Users", function(table) {
        table.increments("id").primary();
        table
          .string("username")
          .unique()
          .notNullable();
        table.text("password").notNullable();
        table.text("name");
        table.text("email").notNullable();
        table.text("phone");
        table.text("logo");
        table.integer("credit_card");
        table.integer("paid").notNullable();
      }),
      knex.schema.createTable("Games", function(table) {
        table.increments("id").primary();
        table.integer("user_id");
        table.foreign("user_id").references("Users.id").onDelete('CASCADE').onUpdate('CASCADE');
        table.text("name").notNullable();
        table.text("description");
        table.timestamp("date_created").defaultTo(knex.fn.now());
        table.timestamp("date_played").defaultTo(null);
      }),
      knex.schema.createTable("Rounds", function(table) {
        table.increments("id").primary();
        table.integer("game_id");
        table.foreign("game_id").references("Games.id").onDelete('CASCADE').onUpdate('CASCADE');
        table.string("name").notNullable();
        table
            .integer("number_of_questions")
            .unsigned()
            .notNullable();
        table.string("category").notNullable();
        table.string("difficulty").notNullable();
        table.string("type").notNullable();
      }),
      knex.schema.createTable("Questions", function(table) {
        table.increments("id").primary();
        table.integer("rounds_id");
        table.foreign("rounds_id").references("Rounds.id").onDelete('CASCADE').onUpdate('CASCADE');
        table.string("category").notNullable();
        table.string("difficulty").notNullable();
        table.string("type").notNullable();
        table.text("question").notNullable();
        table.string("correct_answer").notNullable();
        table.string("incorrect_answers").notNullable();
        table.string("answers").notNullable();
      }),
      
      
      
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTableIfExists("Users"),
      knex.schema.dropTableIfExists("Games"),
      knex.schema.dropTableIfExists("Rounds"),
      knex.schema.dropTableIfExists("Questions"),
    ]);
  };