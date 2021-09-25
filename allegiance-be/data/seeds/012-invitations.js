exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("group_invitees").then(function() {
    // Inserts seed entries
    return knex("group_invitees").insert([
      { user_id: 1, group_id: 1, sender_id: 10 },
      { user_id: 2, group_id: 1, sender_id: 10 },
      { user_id: 3, group_id: 1, sender_id: 10 },
      { user_id: 4, group_id: 2, sender_id: 10 },
      { user_id: 3, group_id: 3, sender_id: 10 }
    ]);
  });
};
