// tbl.increments('id').primary(); // primary key
// tbl.integer('eventId').references('id').inTable('events');
// tbl.integer('userId').references('id').inTable('users');
// tbl.integer('groupId').references('id').inTable('groups');

exports.seed = function(knex, Promise) {
  return knex('eventSubscribers')
    .del() // delete all user's
    .then(function() {
      return knex('eventSubscribers').insert([
        // Event 1
        {
          eventId: 1,
          userId: 5,
          groupId: 1
        },
        {
          eventId: 1,
          userId: 6,
          groupId: 1
        },
        {
          eventId: 1,
          userId: 7,
          groupId: 2
        },
        {
          eventId: 1,
          userId: 5,
          groupId: 3
        },
        {
          eventId: 1,
          userId: 8,
          groupId: 4
        },
        {
          eventId: 1,
          userId: 9,
          groupId: 4
        },
        {
          eventId: 1,
          userId: 7,
          groupId: 5
        },
        {
          eventId: 1,
          userId: 8,
          groupId: 5
        },

        // Event 2
        {
          eventId: 2,
          userId: 5,
          groupId: 6
        },
        {
          eventId: 2,
          userId: 7,
          groupId: 7
        },
        {
          eventId: 2,
          userId: 9,
          groupId: 7
        },
        {
          eventId: 2,
          userId: 6,
          groupId: 8
        },
        {
          eventId: 2,
          userId: 8,
          groupId: 8
        },
        {
          eventId: 2,
          userId: 9,
          groupId: 8
        },
        {
          eventId: 2,
          userId: 5,
          groupId: 9
        },
        {
          eventId: 2,
          userId: 8,
          groupId: 9
        },

        // Event 3
        {
          eventId: 3,
          userId: 5,
          groupId: 10
        },
        {
          eventId: 3,
          userId: 6,
          groupId: 10
        },
        {
          eventId: 3,
          userId: 7,
          groupId: 11
        },
        {
          eventId: 3,
          userId: 8,
          groupId: 12
        },
        {
          eventId: 3,
          userId: 9,
          groupId: 13
        },
        {
          eventId: 3,
          userId: 6,
          groupId: 13
        },

        // Event 4
        {
          eventId: 4,
          userId: 5,
          groupId: 14
        },
        {
          eventId: 4,
          userId: 6,
          groupId: 14
        },
        {
          eventId: 4,
          userId: 7,
          groupId: 15
        },
        {
          eventId: 4,
          userId: 8,
          groupId: 15
        },
        {
          eventId: 4,
          userId: 9,
          groupId: 15
        },
        {
          eventId: 4,
          userId: 5,
          groupId: 16
        },
        {
          eventId: 4,
          userId: 7,
          groupId: 16
        },
        {
          eventId: 4,
          userId: 8,
          groupId: 17
        },

        // Event 5
        {
          eventId: 5,
          userId: 5,
          groupId: 18
        },
        {
          eventId: 5,
          userId: 6,
          groupId: 18
        },
        {
          eventId: 5,
          userId: 7,
          groupId: 19
        },
        {
          eventId: 5,
          userId: 8,
          groupId: 19
        },
        {
          eventId: 5,
          userId: 9,
          groupId: 19
        },
        {
          eventId: 5,
          userId: 5,
          groupId: 19
        },
        {
          eventId: 5,
          userId: 7,
          groupId: 20
        },
        {
          eventId: 5,
          userId: 8,
          groupId: 20
        },
        {
          eventId: 5,
          userId: 9,
          groupId: 21
        },
        {
          eventId: 5,
          userId: 8,
          groupId: 21
        }
      ]);
    });
};
