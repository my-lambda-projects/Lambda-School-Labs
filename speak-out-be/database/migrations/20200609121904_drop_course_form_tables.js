
exports.up = function(knex) {
  return knex.schema.table('course', tbl => {
    // altering columns to reflect input fields on create course form.
    tbl.dropColumn('term_id')
    tbl.string('term')

    tbl.dropColumn('course_type_id')
    tbl.string('course_type')

    tbl.dropColumn('group_type_id')
    tbl.string('group_type')

    tbl.dropColumn('school_grade_id')
    tbl.string('school_grade')

    tbl.dropColumn('level_id')
    tbl.string('level')

    tbl.dropColumn('course_schedule_id')
    tbl.string('course_schedule')

    tbl.dropColumn('room_id')
    tbl.string('room')
  
  })
};

exports.down = function(knex) {
  return knex.schema.table('course', tbl => {
    tbl.dropColumn('room')
    tbl.integer('room_id')
    tbl.dropColumn('course_schedule')
    tbl.integer('course_schedule_id')
    tbl.dropColumn('level')
    tbl.integer('level_id')
    tbl.dropColumn('school_grade')
    tbl.integer('school_grade_id')
    tbl.dropColumn('group_type')
    tbl.integer('group_type_id')
    tbl.dropColumn('course_type')
    tbl.integer('course_type_id')
    tbl.dropColumn('term')
    tbl.integer('term_id')
  })
    
};
