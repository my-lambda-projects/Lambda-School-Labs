const express = require('express');

const {
  takeAttendance,
	getAttendanceRecordOfStudent,
	getAttendanceRecord
} = require('../controllers/attendance.controller');

const {
  checkIfMeetingExists
} = require('../middlewares/attendance.middleware');

const router = express.Router();

router.post('/attendance', checkIfMeetingExists, takeAttendance);
router.get('/attendance/date/:date/course/:course_id', getAttendanceRecord);
router.get('/attendance/courseenrollment/:course_enrollment_id', getAttendanceRecordOfStudent);

module.exports = router;
