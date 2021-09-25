const db = require('../../database/db-config');

const studentView = [
  'ce.id as course_enrollment_id',
  'ce.student_id as student_id',
  'ce.course_id as course_id',
  'c.term as term',
  'c.course_type as course_type',
  'c.group_type as group_type',
  'c.level as course_level',
  'c.section as section',
  'c.status as course_status',
  'c.course_schedule as course_days',
  'ce.first_day as first_day',
  'ce.last_day as last_day',
  'ce.result_type_code as result_type_code',
  'rt.short_description as student_result_type',
  'c.notes',
  'c.start_time as start_time',
  'c.end_time as end_time'
];

const findByID = id => {
  return db('course_enrollment as ce')
    .where('ce.id', '=', id)
    .select(studentView)
    .join('course as c', 'c.id', '=', 'ce.course_id')

    .join(
      'result_type as rt',
      'rt.result_type_code',
      'ce.result_type_code'
    )
    .orderBy('course_id', 'desc')
    .first();
};

const find = (studentID, courseID) => {
  return db('course_enrollment as ce')
    .select(studentView)
    .where({
      'ce.student_id': studentID,
      'ce.course_id': courseID
    })
    .join('course as c', 'c.id', '=', 'ce.course_id')
    .join(
      'result_type as rt',
      'rt.result_type_code',
      'ce.result_type_code'
    )
    .first();
};

const findByCourseID = courseID => {
  return db('course_enrollment as ce')
    .select([
      ...studentView,
      's.cpr as cpr',
      's.gender as gender',
      's.first_name as student_first_name',
      's.additional_names as student_additional_names'
    ])
    .where({
      'ce.course_id': courseID
    })
    .join('course as c', 'c.id', '=', 'ce.course_id')
    // .join('term as t', 't.id', 'c.term_id')
    // .join('course_type as ct', 'ct.id', 'c.course_type_id')
    // .join('group_type as gt', 'gt.id', 'c.group_type_id')
    // .join('level as l', 'l.id', 'c.level')
    // .join(
    //   'course_schedule as cs',
    //   'cs.id',
    //   'c.course_schedule_id'
    // )
    .join(
      'result_type as rt',
      'rt.result_type_code',
      'ce.result_type_code'
    )
    .join('student as s', 's.id', 'ce.student_id');
};

const findAll = () => {
  return db('course_enrollment as ce')
    .select(studentView)
    .join('course as c', 'c.id', '=', 'ce.course_id')
    // .join('term as t', 't.id', 'c.term_id')
    // .join('course_type as ct', 'ct.id', 'c.course_type_id')
    // .join('group_type as gt', 'gt.id', 'c.group_type_id')
    .join('level as l', 'l.id', 'c.level_id')
    // .join(
    //   'course_schedule as cs',
    //   'cs.id',
    //   'c.course_schedule_id'
    // )
    .join(
      'result_type as rt',
      'rt.result_type_code',
      'ce.result_type_code'
    )
    .orderBy('course_id', 'desc');
};

const create = body => {
  return db('course_enrollment')
    .insert(body)
    .returning('id');
};

const remove = (studentID, courseID) => {
  return db('course_enrollment').del().where({
    student_id: studentID,
    course_id: courseID
  });
};

const edit = (studentID, courseID, body) => {
  return db('course_enrollment')
    .where({
      student_id: studentID,
      course_id: courseID
    })
    .update(body)
    .returning('id');
};
const getResultTypes = () => {
  return db('result_type').select([
    'result_type_code',
    'short_description'
  ]);
};

const findCoursesByStudentID = studentID => {
  return db('course_enrollment as ce')
    .where('ce.student_id', '=', studentID)
    .select(studentView)
    .join('course as c', 'c.id', '=', 'ce.course_id')
    .join(
      'result_type as rt',
      'rt.result_type_code',
      'ce.result_type_code'
    )
    .orderBy('course_id', 'desc');
};

module.exports = {
  create,
  find,
  findByID,
  findAll,
  edit,
  remove,
  findCoursesByStudentID,
  findByCourseID,
  getResultTypes
};
