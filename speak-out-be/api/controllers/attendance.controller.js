const { catchAsync } = require('../utils/catchAsync');

const Attendance = require('../models/attendance.model');
const Course = require('../models/course.model')
const CourseEnrollment = require('../models/course_enrollment.model')


const takeAttendance = catchAsync(async (req, res) => {
  if (req.meetingId) {
    await Attendance.editAttendance(
      req.meetingId,
      req.body.meeting,
      req.body.students
    );
    res.status(200).json({ message: 'Attendance edited' });
    return;
  }
  await Attendance.takeAttendance(req.body.meeting, req.body.students);
  res.status(201).json({ message: 'Attendance submitted' });
});

const getAttendanceRecord = catchAsync(async (req, res) => {
  // get list of all teachers from staff model
  // const teachers = await Staff.findAll();
  let staff = await Attendance.findMeeting(
    req.params.date,
    +req.params.course_id
  );
  if (!staff) {
    staff = await Course.findByID(+req.params.course_id);
  }
  const { teacher_id, teacher } = staff;
  let attendanceRecord = await Attendance.getAttendanceRecord(
    req.params.date,
    +req.params.course_id
  );

  let response = {
    meeting: {
      teacher_id,
      teacher
    },
    attendanceRecord,
    attendanceExists: true
  };
  if (attendanceRecord.length === 0) {
    attendance = await CourseEnrollment.findByCourseID(+req.params.course_id);
    attendance.forEach(student => {
      response.attendanceRecord.push({
        student_id: student.student_id,
        student_name: student.student_first_name,
        student_additional_names: student.student_additional_names,
        attendance: 'present'
      });
    });
    response.attendanceExists = false;
  }

  res.status(200).json(response);
});

const getAttendanceRecordOfStudent = catchAsync(async (req, res) => {
  // get list of all teachers from staff model
  const { course_enrollment_id } = req.params;
  const attendanceList = await Attendance.getAttendanceRecordByStudent(
    +course_enrollment_id
  );
  res.status(200).json({
    attendanceList
  });
});

module.exports = {
  takeAttendance,
  getAttendanceRecordOfStudent,
  getAttendanceRecord
};
