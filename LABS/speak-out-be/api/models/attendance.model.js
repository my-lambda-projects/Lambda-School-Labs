const db = require('../../database/db-config');

const takeAttendance = (meeting, students) => {
  /// TRANSACTIONS ARE SO THAT IT EITHER DOES BOTH THINGS OR IT DOES NONE --> IN CASE THERE IS AN ERROR SAVING THE STUDENT ATTENDANCE, WE DONT WANT TO SAVE THE MEETING OR WE WILL HAVE A BUG WHEN TRYING TO FETCH
  return db.transaction(trx => {
    return db('meeting')
      .transacting(trx)
      .insert(meeting)
      .returning('id')
      .then(res => {
        const [id] = res;
        const attendance = students.map(student => {
          return { ...student, meeting_id: id };
        });
        return db('attendance')
          .transacting(trx)
          .insert(attendance)
          .returning('id');
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

const findMeeting = (date, course_id) => {
  return db('meeting')
    .join('staff as s', 's.id', 'meeting.teacher_id')
    .join('user as u', 'u.id', 's.user_id')
    .where({
      meeting_date: date,
      course_id: course_id
    })
    .select(['meeting.id', 'meeting.teacher_id', 'u.name as teacher'])
    .first();
};
const getAttendanceRecord = (date, course_id) => {
  return db('attendance as a')
    .join('student as s', 's.id', 'a.student_id')
    .join('meeting as m', 'm.id', 'a.meeting_id')
    .where('m.meeting_date', '=', date)
    .andWhere('m.course_id', '=', course_id)
    .select([
      's.id as student_id',
      's.first_name as student_name',
      's.additional_names as student_additional_names',
      'a.attendance'
    ]);
  // .orderBy('a.student_id', 'asc');
};

const getAttendanceRecordByStudent = course_enrollment_id => {
  return db('course_enrollment as ce')
    .where('ce.id', '=', course_enrollment_id)
    .join('meeting as m', 'm.course_id', 'ce.course_id')
    .join('attendance as a', function() {
      this.on('a.student_id', '=', 'ce.student_id').andOn(
        'a.meeting_id',
        '=',
        'm.id'
      );
    })
    .join('student as s', 's.id', 'ce.student_id')
    .select([
      'a.student_id',
      's.first_name',
      's.additional_names',
      'a.attendance',
      'm.meeting_date'
    ])
    .orderBy('a.student_id', 'asc');
};

const editAttendance = (meeting_id, meeting, students) => {
  return db.transaction(trx => {
    return db('meeting')
      .transacting(trx)
      .update(meeting)
      .where('id', '=', meeting_id)
      .returning('id')
      .then(async res => {
        const [id] = res;
        const attendance = students.map(student => {
          student.meeting_id = id;
          return db('attendance')
            .transacting(trx)
            .where({ meeting_id: id, student_id: student.student_id })
            .update(student)
            .returning('id');
        });
        await Promise.all(attendance);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

module.exports = {
  takeAttendance,
  getAttendanceRecordByStudent,
  findMeeting,
  editAttendance,
  getAttendanceRecord
};
