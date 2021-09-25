const db = require('../../database/db-config');
const cleaner = require('knex-cleaner');
const StudentModel = require('../models/student.model');
const StaffModel = require('../models/staff.model');
const CourseModel = require('../models/course.model');
const bcrypt = require('bcrypt');
const password = bcrypt.hashSync('pass', 8);

class User {
  constructor(role, name, email) {
    this.user_type = role;
    this.password = password;
    this.name = name;
    this.email = email;
  }
}
class Student {
  constructor(family_id, cpr) {
    this.cpr = cpr;
    this.first_name = 'Onename';
    this.additional_names = 'A lot of names';
    this.gender = 'F';
    this.birthdate = new Date(2003, 4, 23);
    this.school_grade_id = 1;
    this.school_name = 'Alduraz';
    this.phone_number = '12345678';
    this.address = '1234 address st block 2345';
    this.email = 'Whatever';
    this.notes = 'This student is just alright';
    this.no_call = true;
    this.delinquent = false;
    this.expelled = true;
    this.user_id = user_id;
    this.primary_emergency_contact_name = 'Father name';
    this.primary_emergency_relationship = 'Father';
    this.primary_emergency_phone = '2335643636';
    this.emergency_contact_name = 'Mother name';
    this.emergency_relationship = 'Mother';
    this.emergency_phone = '456457434';
  }
}

class Staff {
  constructor(user_id, cpr) {
    this.teaching_rate = '0.00';
    this.active = true;
    this.user_id = user_id;
    this.cpr = cpr;
    this.mobile_number = '12345678';
    this.accent = 'British';
    this.gender = 'F';
    this.birthdate = new Date();
  }
}

class Course {
  constructor(teacher_id) {
    this.term_id = 1; /// TERM NEEDS TO BE SEEDED
    this.course_type_id = 1;
    this.group_type_id = 1;
    this.school_grade_id = 1;
    this.level_id = 1;
    this.section = 'A';
    this.hourly_rate = 7.0;
    this.course_schedule_id = 1;
    this.room_id = 1;
    this.start_time = '16:30:00';
    this.end_time = '18:30:00';
    this.teacher_id = teacher_id;
    this.notes = 'Notes';
    this.status = 'active';
  }
}

const cleanDB = async db => {
  return cleaner.clean(db, {
    mode: 'truncate',
    ignoreTables: [
      'knex_migrations',
      'knex_migrations_lock',
      'school_grade',
      'sessions',
      'term',
      'group_type',
      'course_type',
      'pacing_guide',
      'level',
      'course_schedule',
      'room',
      'result_type',
    ],
  });
};

// IF YOU ONLY NEED USER/STAFF SEED
const seedAStaff = async obj => {
  const user = new User('staff', obj.username, obj.email);
  const [user_id] = await db('user').insert(user).returning('user_id');
  const staff = new Staff(user_id, obj.cpr);
  const [id] = await db('staff').insert(staff).returning('id');
  const staffreturned = await StaffModel.findByID(id);
  return staffreturned;
};

const seedACourse = async staffObj => {
  const staff = await seedAStaff(staffObj);
  const course = new Course(staff.staff_id);
  const [id] = await db('course').insert(course).returning('course_id');
  return Course.findByID(id);
};

// getStaff();
// IF YOU ONLY NEED USER/STAFF(ADMIN) SEED
const seedAnAdmin = async obj => {
  const user = new User('admin', obj.username, obj.email);
  const [userid] = await db('user').insert(user);
  const admin = new Staff(userid, obj.cpr);
  const [id] = await db('staff').insert(admin).returning('*');
  return StaffModel.findByID(id);
};

//IF YOU ONLY NEED USER/PARENT SEED
const seedAParent = async obj => {
  const user = new User('parent', obj.username, obj.email);
  const [id] = await db('user').insert(user).returning('user_id');
  const family = new Family(id);
  return db('family').insert(family).returning('id');
};

// IF YOU ONLY NEED USER/PARENT/STUDENT SEED
const seedAStudent = async (parentObj, studentObj) => {
  const [parentID] = await seedAParent(parentObj);
  const student = new Student(parentID, studentObj.cpr);
  const [id] = await db('student').insert(student).returning('id');
  return StudentModel.findByID(id);
};

//// TEMPORARY - THIS QUERIES WILL BE MOVED TO THEIR OWN MODEL AT ONE POINT
const getSchoolGradeByID = id => {
  return db('school_grade').where('id', '=', id).first();
};

const getParentByID = id => {
  return db('family as f')
    .where('f.id', '=', id)
    .join('user as u', 'u.id', 'f.user_id')
    .first();
};

module.exports = {
  cleanDB,
  seedAParent,
  seedAStudent,
  seedAStaff,
  seedAnAdmin,
  getSchoolGradeByID,
  getParentByID,
  seedACourse,
};
