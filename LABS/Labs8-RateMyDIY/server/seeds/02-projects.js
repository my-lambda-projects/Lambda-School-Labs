exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          user_id: 1,
          project_name: "Front-End",
          text: "front-end application",
          project_rating: 4.2,
          rating_sum: 28,
          rating_count: 7
        },
        {
          user_id: 2,
          project_name: "Back-End",
          text: "back-end application",
          project_rating: 3.7,
          rating_sum: 35,
          rating_count: 10
        },
        {
          user_id: 3,
          project_name: "Full-Stack",
          text: "full-stack application",
          project_rating: 4.5,
          rating_sum: 36,
          rating_count: 8
        },
        {
          user_id: 4,
          project_name: "Data Science",
          text: "data science",
          project_rating: 3.9,
          rating_sum: 25,
          rating_count: 6
        },
      ]);
    });
};
