exports.seed = function(knex) {
  return knex("interests").insert([
    { id: 1, name: "Sports" },
    { id: 2, name: "Arts & Crafts" },
    { id: 3, name: "Outdoors" },
    { id: 4, name: "Video Games" },
    { id: 5, name: "Film/TV" }
  ]);
};
