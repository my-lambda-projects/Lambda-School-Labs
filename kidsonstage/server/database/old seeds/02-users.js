// tbl.increments('id').primary(); // primary key
// tbl.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
// tbl.integer('userClass').references('id').inTable('userClass').defaultTo('1');
// tbl.string('username', 32).notNullable().unique('username');
// tbl.string('password', 32).notNullable();
// tbl.string('email', 70).notNullable();
// tbl.string('phoneNumber',12)
// tbl.string('vcode', 8).notNullable();
// tbl.boolean('validated').defaultTo(false);
// tbl.boolean('byEmail').defaultTo(false);
// tbl.boolean('byPhone').defaultTo(false);

exports.seed = function(knex, Promise) {
  return knex('users')
    .del() // delete all user's
    .then(function() {
      return knex('users').insert([
        {
          userClass: 3,
          username: 'super1',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '210-992-0203',
          vcode: 12345678,
          validated: true,
          byEmail: true,
          byPhone: true
        },
        {
          userClass: 2,
          username: 'admin1',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '775-771-8676',
          vcode: 12345678,
          validated: true,
          byEmail: true,
          byPhone: true
        },
        {
          userClass: 2,
          username: 'admin2',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '775-771-8676',
          vcode: 12345678,
          validated: true,
          byEmail: true,
          byPhone: false
        },
        {
          userClass: 2,
          username: 'admin3',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '',
          vcode: 12345678,
          validated: true,
          byEmail: true,
          byPhone: true
        },
        {
          userClass: 1,
          username: 'user1',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '210-992-0265',
          vcode: 12345678,
          validated: true,
          byEmail: true,
          byPhone: true
        },
        {
          userClass: 1,
          username: 'user2',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '210-992-0265',
          vcode: 12345678,
          validated: true,
          byEmail: true,
          byPhone: false
        },
        {
          userClass: 1,
          username: 'user3',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '775-771-8676',
          vcode: 12345678,
          validated: false,
          byEmail: false,
          byPhone: true
        },
        {
          userClass: 1,
          username: 'user4',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '608-695-4106',
          vcode: 12345678,
          validated: true,
          byEmail: false,
          byPhone: true
        },
        {
          userClass: 1,
          username: 'user5',
          password:
            '$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy',
          email: 'tylersanford0311@gmail.com',
          phoneNumber: '775-771-8676',
          vcode: 12345678,
          validated: true,
          byEmail: true,
          byPhone: true
        }
      ]);
    });
};
