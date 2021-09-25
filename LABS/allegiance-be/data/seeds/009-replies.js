
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      return knex('replies').insert([
        {post_id: 1, user_id: 1, reply_content: "Some reply content goes here"}
            ]);
    };
