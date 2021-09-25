
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      return knex('replies_likes').insert([
        {user_id: 1, reply_id: 1}
      ]);
   };
