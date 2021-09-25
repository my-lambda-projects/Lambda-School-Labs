
exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes-ingredients", tbl => {
    tbl.increments();
    tbl
        .integer("recipe_id")
        .references("recipes.id");
    tbl
        .integer("ingredient_id")
        .references("ingredients.id");
    tbl
        .float("quantity")
        .notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("recipes-ingredients");
};
