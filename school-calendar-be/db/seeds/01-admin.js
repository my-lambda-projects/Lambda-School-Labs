
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {
          id: 1,
          name: 'Aldair Balanzar',
          email: 'abalanzar7@gmail.com',
          googleId: '108445608055644348507'
        }
      ]);
    });
};
