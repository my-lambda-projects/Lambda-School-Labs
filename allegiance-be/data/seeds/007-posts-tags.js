
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      return knex('posts_tags').insert([
        {post_id: 1, tagged_user_id: 1},
        
      ]);
   };
