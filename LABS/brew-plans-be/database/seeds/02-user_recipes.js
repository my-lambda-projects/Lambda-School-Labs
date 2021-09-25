exports.seed = function(knex, Promise) {
  return knex("user_recipes").insert([
    {
      title: "Pour Over User Recipe",
      brew_type: "Pour Over",
      public_private: 0,
      water_temp: 50,
      userString: "123456",
      coarseness: "fine"
    },
    {
      title: "Testing seed title2",
      brew_type: "testing",
      public_private: 0,
      water_temp: 30,
      userString: "123456",
      coarseness: "fine"
    },
    {
      title: "Testing seed title3",
      brew_type: "testing",
      public_private: 1,
      water_temp: 30,
      userString: "123456",
      coarseness: "rough"
    },
    {
      title: "Testing seed title4",
      brew_type: "testing",
      public_private: 1,
      water_temp: 40,
      userString: "123456",
      coarseness: "fine"
    },
    {
      title: "Testing seed title5",
      brew_type: "testing",
      public_private: 1,
      water_temp: 70,
      userString: "123456",
      coarseness: "rough"
    }
  ]);
};
