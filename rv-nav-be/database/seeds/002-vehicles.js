exports.seed = function (knex) {

  // Inserts seed entries
  return knex('vehicle').insert([
    {
      id: 1,
      user_id: 1,
      name: 'the beast',
      height: 10.2,
      weight: 10900.0,
      width: 12.5,
      length: 32.5,
      axel_count: 2,
      vehicle_class: 'A',
      dual_tires: true,
      trailer: false
    },
    {
      id: 2,
      user_id: 1,
      name: 'the beast mini',
      height: 10.2,
      weight: 8900.0,
      width: 10.5,
      length: 22.5,
      axel_count: 2,
      vehicle_class: 'A',
      dual_tires: false,
      trailer: true
    }
  ]);
};



