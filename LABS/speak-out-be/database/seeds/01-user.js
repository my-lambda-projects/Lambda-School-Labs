const bcrypt = require('bcrypt');
exports.seed = function (knex) {
  const password = bcrypt.hashSync('pass', 8);
  return knex('user').insert([
    {
      user_type: 'admin',
      password,
      name: 'Victoria Labdon',
      email: 'admin@email.com',
    },
    {
      user_type: 'staff',
      password,
      name: 'Layla Al Shehabi',
      email: 'staff1@email.com',
    },
    {
      user_type: 'staff',
      password,
      name: 'Sarah Ameer',
      email: 'staff2@email.com',
    },
    {
      user_type: 'staff',
      password,
      name: 'Linda Munoz',
      email: 'staff3@email.com',
    },
    {
      user_type: 'staff',
      password,
      name: 'Austin Shea',
      email: 'staff4@email.com',
    },
    {
      user_type: 'parent',
      password,
      name: 'Haroon Akram Rahmani',
      email: 'parent@email.com',
    },

    {
      user_type: 'parent',
      password,
      name: 'Imaan Mohammad Hussein Khalili',
      email: 'parent2@email.com',
    },

    {
      user_type: 'parent',
      password,
      name: 'Siraj Sharif Ozer Tariq',
      email: 'parent3@email.com',
    },

    {
      user_type: 'parent',
      password,
      name: 'Hulwi Mohammad Hussein Harroun',
      email: 'parent4@email.com',
    },

    {
      user_type: 'parent',
      password,
      name: 'Hussien Nasma Abdou',
      email: 'parent5@email.com',
    },
    {
      user_type: 'parent',
      password,
      name: 'Raja Abdou Ghani',
      email: 'parent6@email.com',
    },
  ]);
};
