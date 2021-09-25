exports.up = function(knex) {
  return knex.schema.table('student', table => {
    
    // adds enroll status column to student table.
    //used for checkiong if student is enrolled yet
    table.boolean('enrolled')
      .defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.table('student', table => {
    table.dropColumn('enrolled')
  })
};