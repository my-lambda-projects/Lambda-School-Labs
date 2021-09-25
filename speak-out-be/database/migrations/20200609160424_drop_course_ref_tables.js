
exports.up = function(knex) {
  return knex.schema.table('student', table => {
    table.dropColumn('school_grade_id')
    table.string('school_grade')
  })
  .then(() => {
    return knex.schema.hasTable('course')
    .then(exists => {
      if(exists) {
        return (
          knex.schema.dropTableIfExists('term')
          .then(() => knex.schema.dropTableIfExists('course_type'))
          .then(() => knex.schema.dropTableIfExists('group_type'))
          .then(() => knex.schema.dropTableIfExists('school_grade'))
          .then(() => knex.schema.dropTableIfExists('course_schedule'))
          .then(() => knex.schema.dropTableIfExists('room'))
        )
      }
    })
  })
  
};

exports.down = function(knex) {
  return knex.schema
  .createTable('room', table => {
    table.increments();
  })
  .createTable('course_schedule', table => {
    table.increments();
  })
  .createTable('school_grade', table => {
    table.increments();
  })
  .createTable('group_type', table => {
    table.increments();
  })
  .createTable('course_type', table => {
    table.increments();
  })
  .createTable('term', table => {
    table.increments();
  })
};