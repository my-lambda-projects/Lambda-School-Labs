exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('result_type').del().then(function() {
    // Inserts seed entries
    return knex('result_type').insert([
      {
        result_type_code: -3,
        short_description: 'Unconfirmed',
        long_description: 'Long description'
      },
      {
        result_type_code: -2,
        short_description: 'No Show',
        long_description: 'Long description'
      },
      {
        result_type_code: -1,
        short_description: 'Unenrolled',
        long_description: 'Long description'
      },
      {
        result_type_code: 0,
        short_description: 'Dropped',
        long_description: 'Long description'
      },
      {
        result_type_code: 1,
        short_description: 'Transferred',
        long_description: 'Long description'
      },
      {
        result_type_code: 2,
        short_description: 'Failed',
        long_description: 'Long description'
      },
      {
        result_type_code: 3,
        short_description: 'Incomplete',
        long_description: 'Long description'
      },
      {
        result_type_code: 4,
        short_description: 'No Exam',
        long_description: 'Long description'
      },
      {
        result_type_code: 5,
        short_description: 'Passed',
        long_description: 'Long description'
      },
      {
        result_type_code: 6,
        short_description: 'Confirmed',
        long_description: 'Long description'
      }
    ]);
  });
};
