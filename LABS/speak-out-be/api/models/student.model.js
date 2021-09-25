const db = require('../../database/db-config');

const returning = [
  's.id as student_id',
  's.cpr',
  's.first_name',
  's.additional_names',
  's.gender',
  's.registration_date',
  's.birthdate',
  's.gender',
  's.school_grade',
  's.school_name',
  's.grade_updated',
  's.phone_number',
  's.address',
  's.email',
  's.notes',
  's.no_call',
  's.delinquent',
  's.expelled',
  's.enrolled',
  's.user_id',
  's.enrolled',
  'u.name as parent_name',
  's.primary_emergency_contact_name',
  's.primary_emergency_relationship',
  's.primary_emergency_phone',
  's.emergency_contact_name',
  's.emergency_relationship',
  's.emergency_phone',
  's.attempts'
];

const create = body => {
  return db('student')
    .insert(body)
    .returning('*');
};

const findAll = () => {
  return db('student as s')
    .join('user as u', 'u.id', 's.user_id')
    .select(returning)
    .orderBy('s.id', 'desc');
};

const findByID = id => {
  return db('student as s')
    .where('s.id', '=', id)
    .join('user as u', 'u.id', 's.user_id')
    .select(returning)
    .first();
};

const findByCPR = cpr => {
  return db('student as s')
    .where('s.cpr', '=', cpr)
    .join('user as u', 'u.id', 's.user_id')
    .select(returning)
    .first();
};

const remove = id => {
  return db('student')
    .del()
    .where({ id });
};

const update = (id, body) => {
  return db('student')
    .update(body)
    .where({ id })
    .returning('*');
};

const getAllSchoolGrades = () => {
  return db('school_grade').select(['id', 'name']);
};

module.exports = {
  findAll,
  findByID,
  findByCPR,
  remove,
  create,
  update,
  getAllSchoolGrades
};
