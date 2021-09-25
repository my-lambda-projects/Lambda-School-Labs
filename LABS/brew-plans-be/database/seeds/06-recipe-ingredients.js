exports.seed = function(knex, Promise) {
  return knex("recipe_ingredients").insert([
    { recipe_id: 1, quantity: "1 teaspoon", ingredient_id: 1 },
    { recipe_id: 1, quantity: "3 grams", ingredient_id: 2 }
  ]);
};
