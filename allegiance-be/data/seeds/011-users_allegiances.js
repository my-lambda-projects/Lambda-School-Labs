exports.seed = function(knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("users_allegiances").insert([
    { user_id: 1, allegiance_id: 1 },
    { user_id: 2, allegiance_id: 2 },
    { user_id: 3, allegiance_id: 3 },
    { user_id: 4, allegiance_id: 4 },
    { user_id: 5, allegiance_id: 5 },
    { user_id: 6, allegiance_id: 6 },
    { user_id: 7, allegiance_id: 7 },
    { user_id: 8, allegiance_id: 8 },
    { user_id: 9, allegiance_id: 9 },
    { user_id: 10, allegiance_id: 10 },
    { user_id: 11, allegiance_id: 1 },
    { user_id: 12, allegiance_id: 1 },
    { user_id: 13, allegiance_id: 3 },
    { user_id: 14, allegiance_id: 3 },
    { user_id: 15, allegiance_id: 15 },
    { user_id: 16, allegiance_id: 8 },
    { user_id: 17, allegiance_id: 8 },
    { user_id: 18, allegiance_id: 8 },
    { user_id: 1, allegiance_id: 2 },
    { user_id: 2, allegiance_id: 5 },
    { user_id: 2, allegiance_id: 6 },
    { user_id: 2, allegiance_id: 7 },
    { user_id: 3, allegiance_id: 8 },
    { user_id: 1, allegiance_id: 6 },
    { user_id: 3, allegiance_id: 9 }
  ]);
};
