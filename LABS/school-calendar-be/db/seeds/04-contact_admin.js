
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contact_admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('contact_admin').insert([
        {
          adminId: 1,
          contactId: 1
        },
        {
          adminId: 1,
          contactId: 2
        },
        {
          adminId: 1,
          contactId: 3
        },
        {
          adminId: 1,
          contactId: 4
        },
        {
          adminId: 1,
          contactId: 5
        }
      ]);
    });
};
