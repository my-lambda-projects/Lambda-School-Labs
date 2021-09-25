
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contacts').insert([
        {
          id: 1,
          firstName: 'roberto',
          lastName: 'carlos',
          phoneNumber: '1234567890',
          email: '123@email.com'
        },
        {
          id: 2,
          firstName: 'samuel',
          lastName: 'wackson',
          phoneNumber: '1234567800',
          email: '456@email.com'
        },
        {
          id: 3,
          firstName: 'alonse',
          lastName: 'henri',
          phoneNumber: '1234567000',
          email: '789@email.com'
        },
        {
          id: 4,
          firstName: 'federica',
          lastName: 'varane',
          phoneNumber: '1234560000',
          email: '101112@email.com'
        },
        {
          id: 5,
          firstName: 'andre',
          lastName: 'seto',
          phoneNumber: '1234500000',
          email: '131415@email.com'
        }
      ]);
    });
};
