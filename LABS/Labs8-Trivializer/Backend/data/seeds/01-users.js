exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("Users")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("Users").insert([
                {
                    id: 1,
                    username: "testUser1",
                    password:
                        "6edfc60cfc0b9fdbcfedb1c310b23dcdb999808644f2713b9534d5aae90033c3129f80884da7b5683a18143af117526cb7fe5da6636e6878092e7cb6e56984a37b79ea3837a8515cc1641cd76e930ee0",
                    email: "testUser1@test.com"
                }
            ]);
        });
};
