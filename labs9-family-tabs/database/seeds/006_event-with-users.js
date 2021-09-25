
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('eventWithUsers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('eventWithUsers').insert([
        {userID: 1, scheduledEventID: 1, familyID: 1},
        {userID: 2, scheduledEventID: 1, familyID: 1},
        {userID: 3, scheduledEventID: 1, familyID: 1},
        {userID: 6, scheduledEventID: 2, familyID: 2},
        {userID: 2, scheduledEventID: 3, familyID: 1},
        {userID: 3, scheduledEventID: 3, familyID: 1},
        {userID: 2, scheduledEventID: 4, familyID: 1},
        {userID: 3, scheduledEventID: 4, familyID: 1},
        {userID: 2, scheduledEventID: 6, familyID: 1},
        {userID: 4, scheduledEventID: 7, familyID: 1},
        {userID: 4, scheduledEventID: 5, familyID: 1},
        {userID: 4, scheduledEventID: 8, familyID: 1}
      ]);
    });
};
