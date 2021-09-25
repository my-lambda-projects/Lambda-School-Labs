exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          firebaseid: '1234'
        },
        {
          firebaseid: '1235'
        },
        {
          firebaseid: '1236'
        },
        {
          firebaseid: '1237'
        }
      ]);
    });
};
