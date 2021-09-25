
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('eventType').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('eventType').insert([
        {eventType_name: 'baseball', familyID: 1},
        {eventType_name: 'figure skating', familyID: 2},
        {eventType_name: 'skateboarding', familyID: 1}
      ]);
    });
};
