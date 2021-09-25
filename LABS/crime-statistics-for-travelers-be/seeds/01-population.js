
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('population').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('population').insert([
{total:"18056485"}
      ]);
    });
};
