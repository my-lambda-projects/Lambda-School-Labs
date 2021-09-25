
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('location').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('location').insert([
        {location_name: 'baseball park', address: '345 baseball avenue, Lexington, NJ, 55542', familyID: 1},
        {location_name: 'ice skating rink', address: '452 icey street, Marlboro, TX, 64515 ', familyID: 2},
        {location_name: 'skate park', address: '360 McTwist boulevard, Lexington, NJ, 55542', familyID: 1},
      ]);
    });
};
