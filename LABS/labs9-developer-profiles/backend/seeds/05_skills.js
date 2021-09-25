exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skills')
      .del()
      .then(function () {
          // Inserts seed entries
          return knex('skills')
              .truncate()
              .insert([
                  {skill: "RoR"},
                  {skill: "Ruby"},
                  {skill: "Python"},
                  {skill: "Angular"},
                  {skill: "MongoDB"},
                  {skill: "Java"},
                  {skill: "Elixir"},
                  {skill: "Javascript"},
                  {skill: "React"},
                  {skill: "Node"},
                  {skill: "SQL"},
                  {skill: "C"},
                  {skill: "Vue"},
                  {skill: "React Native"},
                  {skill: "Swift"}
              ]);
      }).catch(err => {
          console.log(err)
      })
};
