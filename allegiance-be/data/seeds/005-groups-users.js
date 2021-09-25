const faker = require("faker");

exports.seed = function(knex) {
  // Deletes ALL existing entries

  // Creates unified created/updated at dates for groups
  function dates() {
    date = faker.date.past();
    return { created_at: date, updated_at: date };
  }
  // Inserts seed entries

  return knex("groups_users").insert([
    {
      user_id: 1,
      user_type: "admin",
      group_id: 1,
      ...dates()
    },
    {
      user_id: 1,
      user_type: "admin",
      group_id: 2,
      ...dates()
    },
    {
      user_id: 1,
      user_type: "admin",
      group_id: 3,
      ...dates()
    },
    {
      user_id: 2,
      user_type: "member",
      group_id: 4,
      ...dates()
    },
    {
      user_id: 2,
      user_type: "invited",
      group_id: 5,
      ...dates()
    },
    {
      user_id: 2,
      user_type: "invited",
      group_id: 6,
      ...dates()
    },
    {
      user_id: 3,
      user_type: "admin",
      group_id: 7,
      ...dates()
    },
    {
      user_id: 3,
      user_type: "member",
      group_id: 8,
      ...dates()
    },
    {
      user_id: 3,
      user_type: "admin",
      group_id: 9,
      ...dates()
    },
    {
      user_id: 4,
      user_type: "invited",
      group_id: 10,
      ...dates()
    },
    {
      user_id: 4,
      user_type: "member",
      group_id: 11,
      ...dates()
    },
    {
      user_id: 4,
      user_type: "member",
      group_id: 12,
      ...dates()
    },
    {
      user_id: 5,
      user_type: "admin",
      group_id: 1,
      ...dates()
    },
    {
      user_id: 5,
      user_type: "admin",
      group_id: 2,
      ...dates()
    },
    {
      user_id: 5,
      user_type: "admin",
      group_id: 3,
      ...dates()
    },
    {
      user_id: 6,
      user_type: "member",
      group_id: 4,
      ...dates()
    },
    {
      user_id: 6,
      user_type: "member",
      group_id: 5,
      ...dates()
    },
    {
      user_id: 6,
      user_type: "invited",
      group_id: 6,
      ...dates()
    },
    {
      user_id: 7,
      user_type: "admin",
      group_id: 7,
      ...dates()
    },
    {
      user_id: 7,
      user_type: "invited",
      group_id: 8,
      ...dates()
    },
    {
      user_id: 7,
      user_type: "admin",
      group_id: 9,
      ...dates()
    },
    {
      user_id: 8,
      user_type: "admin",
      group_id: 10,
      ...dates()
    },
    {
      user_id: 8,
      user_type: "member",
      group_id: 11,
      ...dates()
    },
    {
      user_id: 8,
      user_type: "invited",
      group_id: 12,
      ...dates()
    },
    {
      user_id: 9,
      user_type: "admin",
      group_id: 13,
      ...dates()
    }
  ]);
};
