
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'chad'},
        {id: 2, username: 'Tai'},
        {id: 3, username: 'jared'},
        {id: 4, username: 'fred'},
        {id: 5, username: 'Richard'},
        {id: 6, username: 'thomas'},
      ]);
    });
};

