exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("achievements")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("achievements").insert([
        {
          id: 1,
          title: "Beginner Logger",
          description: "Log 5 tacos."
        },
        { id: 2, title: "Intermediate Logger", description: "Log 10 tacos" },
        { id: 3, title: "Expert Logger", description: "Log 20 tacos" },
        { id: 4, title: "All Meats", description: "Tried every meat at least once." },
        { id: 5, title: "All Cheese", description: "Tried every cheese at least once." },
        { id: 6, title: "All Salsa", description: "Tried every salsa at least once." }

      ]);
    });
};
