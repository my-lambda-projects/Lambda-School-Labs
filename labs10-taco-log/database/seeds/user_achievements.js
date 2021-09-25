exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("user_achievements")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user_achievements").insert([
        { user_id: 1, achievement_id: 1 },
        { user_id: 1, achievement_id: 2 },
        { user_id: 1, achievement_id: 3 },
        { user_id: 2, achievement_id: 1 },
        { user_id: 2, achievement_id: 2 },
        { user_id: 3, achievement_id: 1 }
      ]);
    });
};
