exports.seed = function(knex, Promise) {
  return knex("ingredients").insert([
    { title: "Sugar" },
    { title: "Paper" },
    { title: "Coffee Machine " },
    { title: "Beans" }
  ]);
};
