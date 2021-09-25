exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipes-ingredients")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("recipes-ingredients").insert([
        { recipe_id: 3, ingredient_id: 1, quantity: 2 },
        { recipe_id: 1, ingredient_id: 2, quantity: 17 },
        { recipe_id: 2, ingredient_id: 2, quantity: 2.5 },
        { recipe_id: 3, ingredient_id: 2, quantity: 7 }
      ]);
    });
};
