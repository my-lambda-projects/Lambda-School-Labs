exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("Games")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("Games").insert([
                { id: 1, user_id: 1, name: "Test", description: "Test" }
            ]);
        });
};
