exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments()

    tbl
      .string('name', 128)
      .notNullable()

    tbl
      .string('email', 128)
      .notNullable()
      .unique()

    tbl
      .string('user_pic')

    tbl
      .boolean('isPremium')
      .defaultTo(false)

    tbl
      .string('phone', 128)

    tbl
      .specificType('reminder', 'text ARRAY')

    tbl
      .string('hard_or_soft', 128)
      .defaultTo('unassigned')

    tbl
      .string('heat_pref', 128)
      .defaultTo('unassigned')


    tbl
      .string('street_gourmet', 128)
      .defaultTo('unassigned')


  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};