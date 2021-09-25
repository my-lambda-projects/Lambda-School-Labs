exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        { name: "taco", user_id: 1, description: "Enjoy!" },
        { name: "chicken", user_id: 2, description: "Enjoy!" },
        { name: "pizza", user_id: 3, description: "Enjoy!" }
      ]);
    });
};
