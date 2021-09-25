exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('staff').insert([
    {
      teaching_rate: '10.00',
      active: true,
      user_id: 2,
      cpr: '8709XXXX1',
      mobile_number: '384-555-65',
      accent: 'Gulf Arabic',
      gender: 'F',
      birthdate: new Date(1987, 08, 29)
    },
    {
      teaching_rate: '10.00',
      active: true,
      user_id: 3,
      cpr: '9404XXXX2',
      mobile_number: '384-555-65',
      accent: 'Gulf Arabic',
      gender: 'F',
      birthdate: new Date(1994, 3, 2)
    },
    {
      teaching_rate: '10.00',
      active: true,
      user_id: 4,
      cpr: '9302XXXX3',
      mobile_number: '384-555-65',
      accent: 'North American',
      gender: 'F',
      birthdate: new Date(1993, 1, 1)
    },
    {
      teaching_rate: '10.00',
      active: true,
      user_id: 5,
      cpr: '9007XXXX4',
      mobile_number: '384-555-65',
      accent: 'North American',
      gender: 'M',
      birthdate: new Date(1990, 6, 19)
    }
  ]);
};
