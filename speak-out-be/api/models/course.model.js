const db = require('../../database/db-config');

const returning = [
  'course.id as course_id',
  'course.term as term',
  // 'term.name as term',
  'course.term as term',
  'course.section',
  'course.hourly_rate',
  'course.start_time',
  'course.end_time',
  'course.start_date',
  'course.end_date',
  'course.notes',
  'course.status',
  'course.course_type as course_type',
  'course.group_type as group_type',
  'course.school_grade as school_grade',
  'course.level as level',
  'course.course_schedule as course_schedule',
  'course.room as room',
  'course.teacher_id as teacher_id',
  'user.name as teacher'
];

const find = queries => {
  const query = db('course')
    .select(returning)
    // THIS SELECTS GET THE ACTIVE STUDENTS ETC, IF THE RESULT_TYPE_CODE CHANGES, THIS NEEDS TO BE CHANGED
    .select(function() {
      this.from('course_enrollment as ce')
        .whereRaw('ce.course_id = course.id')
        .count()
        .as('total_students');
    })
    .select(function() {
      this.from('course_enrollment as ce')
        .whereRaw('ce.course_id = course.id')
        .andWhere(function() {
          this.whereIn('ce.result_type_code', [5, 6]);
        })
        .count()
        .as('confirmed_students');
    })
    .select(function() {
      this.from('course_enrollment as ce')
        .whereRaw('ce.course_id = course.id')
        .andWhere('ce.result_type_code', -3)
        .count()
        .as('unconfirmed_students');
    })
    .join('staff', 'staff.id', 'course.teacher_id')
    .join('user', 'user.id', 'staff.user_id')
    .orderBy('course.id', 'desc');

  const { term, section, level } = queries;
  if (term) {
    query.where('course.term_id', '=', term);
  }
  if (section) {
    query.where('course.section', '=', section);
  }
  if (level) {
    query.where('course.level_id', '=', level);
  }
  return query;
};

const findByID = id => {
  return db('course')
    .select(returning)
    .where('course.id', '=', id)
    .first()
    .join('staff', 'staff.id', 'course.teacher_id')
    .join('user', 'user.id', 'staff.user_id')
};

const create = body => {
  return db('course').insert(body).returning('id');
};

const edit = (body, id) => {
  return db('course')
    .update(body)
    .where({ id })
    .returning('id');
};

const findCoursesByTeacherID = teacherID => {
  return db('course')
    .where('teacher_id', '=', teacherID)
    .select(returning)
    .join('staff', 'staff.id', 'course.teacher_id')
    .join('user', 'user.id', 'staff.user_id')
    .orderBy('course.id', 'desc');
};

const remove = id => {
  return db('course').where({ id }).del();
};

/// THIS IS FOR POPULATING DROPDOWNS IN THE CLIENT
const findAllTerms = () => {
  return db('term').select('id', 'name');
};
const findAllCourseTypes = () => {
  return db('course_type').select('id', 'description');
};

const findAllGroupTypes = () => {
  return db('group_type').select('id', 'short_description');
};
const findAllSchoolGrades = () => {
  return db('school_grade').select('id', 'name');
};
const findAllLevels = () => {
  return db('level').select('id', 'description');
};
const findAllCourseSchedules = () => {
  return db('course_schedule').select(
    'id',
    'short_description'
  );
};
const findAllRooms = () => {
  return db('room').select('id', 'chairs');
};

module.exports = {
  findByID,
  findAllTerms,
  findAllCourseTypes,
  findAllGroupTypes,
  findAllSchoolGrades,
  findAllLevels,
  findAllCourseSchedules,
  findAllRooms,
  create,
  find,
  edit,
  remove,
  findCoursesByTeacherID
};
