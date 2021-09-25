
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contact_group').del()
    .then(function () {
      // Inserts seed entries
      return knex('contact_group').insert([
        {
          contactId: 1,
          groupId: 1
        },
        {
          contactId: 2,
          groupId: 1
        },
        {
          contactId: 3,
          groupId: 1
        },
        {
          contactId: 4,
          groupId: 1
        },
        {
          contactId: 5,
          groupId: 2
        },
        {
          contactId: 1,
          groupId: 2
        },
        {
          contactId: 1,
          groupId: 3
        },
      ]);
    });
};
