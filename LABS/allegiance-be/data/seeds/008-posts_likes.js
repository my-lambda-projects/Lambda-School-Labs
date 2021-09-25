
exports.seed = function(knex) {
  // Deletes ALL existing entries
      // Inserts seed entries
      return knex('posts_likes').insert([
        {user_id: 1, post_id: 1},
        
      ]);
   
};
