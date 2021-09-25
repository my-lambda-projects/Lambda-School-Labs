exports.seed = function(knex, Promise) {
  return knex("instructions").insert([
    {
      order: 1,
      text: "Bring at least 600 grams(20 oz) of water to a boil.",
      recipe_id: 1
    },
    {
      order: 2,
      text: "Place a filter in the dripper and pre-wet filter.",
      recipe_id: 1
    },
    {
      order: 3,
      text: "Place brewer over cup or carafe, add 30 grams ground coffee, and tap to level surface.",
      recipe_id: 1
    },
    {
      order: 4,
      text: "Pour 60 grams of water, ensuring all grounds are saturated.",
      recipe_id: 1
    }, {
      order: 5,
      text: "Wait 30 seconds, then pour 90 grams of water in a spiral from the middle to the filter and back to the middle.",
      recipe_id: 1,
      duration: 30
    }, {
      order: 6,
      text: "Wait 50 seconds, then pour 100 grams of water in the same pattern as the previous pour.",
      recipe_id: 1,
      duration: 50
    }, {
      order: 7,
      text: "Once the water has drained, pour an additional 100 grams of water.",
      recipe_id: 1
    }

  ]);
};
