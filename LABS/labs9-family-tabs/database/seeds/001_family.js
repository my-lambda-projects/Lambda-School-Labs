
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('family').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('family').insert([
        {family_name: 'Jones'},
        {family_name: 'Smith'},
        {family_name: 'Franks'},
      ]);
    });
};
