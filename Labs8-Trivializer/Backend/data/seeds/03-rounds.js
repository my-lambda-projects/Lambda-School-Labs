exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("Rounds")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("Rounds").insert([
                {
                    id: 1,
                    game_id: 1,
                    name: "Test",
                    number_of_questions: 10,
                    category: "Any",
                    difficulty: "Any",
                    type: "Any"
                }
            ]);
        });
};
