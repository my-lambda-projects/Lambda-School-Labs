// tbl.increments('id').primary(); // primary key
// tbl.string('className', 32).notNullable().unique('className');

exports.seed = function(knex, Promise) {
  return knex('userClass')
    .del() // delete all user's
    .then(function() {
      return knex('userClass').insert([
        {
          className: 'user'
        },
        {
          className: 'admin'
        },
        {
          className: 'Super Admin'
        }
      ]);
    });
};
