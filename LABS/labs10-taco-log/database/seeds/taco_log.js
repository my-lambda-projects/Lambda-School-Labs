
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('taco-log').del()
    .then(function () {
      // Inserts seed entries
      return knex('taco-log').insert([
        {id: 1, user_id: 1, tortilla: "Flour", meat: "Chicken", cheese: "Manchego", salsa: "Pico", taco_name: "Big Taco"}
      ]);
    });
};
