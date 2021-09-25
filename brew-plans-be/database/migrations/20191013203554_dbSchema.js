exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users.string("userString").unique();
      users.string("username", 60).unique();
      users.string("password", 60).notNullable();
      users
        .string("email", 60)
        .notNullable()
        .unique();
    })
    .createTable("seeded_recipes", seededed_recipes => {
      seededed_recipes.increments();
      seededed_recipes.string("title", 60).notNullable();
      seededed_recipes.string("instructions", 1000).notNullable();
      seededed_recipes.string("brew_type");
      seededed_recipes.integer("water_temp");
      seededed_recipes.string("coarseness");
    })
    .createTable("user_recipes", user_recipes => {
      user_recipes.increments();
      user_recipes.string("title", 255).notNullable();
      user_recipes.string("brew_type", 60);
      user_recipes.binary("public_private");
      user_recipes.integer("water_temp");
      user_recipes
        .string("userString")
        // .notNullable()
        // .references("userString")
        // .inTable("users")
        // .onDelete("CASCADE")
        // .onUpdate("CASCADE");
      user_recipes.string("coarseness");
      // user_recipes.string("instructions");
      // user_recipes
      //     .integer('ingredients_id')
      //     .unsigned()
      //     // .notNullable()
      //     .references('id')
      //     .inTable('ingredients')
      //     .onDelete('CASCADE')
      //     .onUpdate('CASCADE');
      //   user_recipes.integer("ingredient_qty");
    })
    .createTable("instructions", instructions => {
      instructions.increments();
      instructions.integer("order").notNullable();
      instructions.string("text").notNullable();
      instructions
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user_recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
       instructions.integer("duration") 
    })

    .createTable("ingredients", ingredients => {
      ingredients.increments();

      ingredients.string("title", 60).notNullable();
    })
    .createTable("recipe_ingredients", recipe_ingredients => {
      recipe_ingredients.increments();
      recipe_ingredients
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user_recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      recipe_ingredients.string("quantity", 60).notNullable();
      recipe_ingredients
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ingredients")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("logs", logs => {
      logs.increments();
      logs
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user_recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      logs
        .string("userString")
        .unsigned()
        .notNullable()
        .references("userString")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      logs.integer("rating");
      logs.string("comment");
      logs.string("createdAt")
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("logs")
    .dropTableIfExists("recipe_ingredients")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("instructions")
    .dropTableIfExists("user_recipes")
    .dropTableIfExists("seeded_recipes")
    .dropTableIfExists("users");
};
