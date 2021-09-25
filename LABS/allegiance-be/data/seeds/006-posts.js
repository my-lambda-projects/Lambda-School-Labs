
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: 1, group_id: 1, post_content: 'This is a post'}
        
        
      ]);
   };
