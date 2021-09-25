const express = require('express');

const {
  enrollAStudentInCourse,
  unenrollAStudentInCourse,
  editEnrollment,
  getAllEnrollmentsOfCourses,
  getOneEnrollment,
  getCourseEnrollmentDropdowns
} = require('../controllers/course_enrollment.controller');

const {
  validateCourseEnrollmentBody,
  validateIfStudentIsEnrolled,
  updateEnrollment,
  removeEnrollment
} = require('../middlewares/course_enrollment.middleware');

const {
  validateCourseID
} = require('../middlewares/course.middleware');

const {
  validateStudentID
} = require('../middlewares/student.middleware');

const router = express.Router();


const validation = [
  validateCourseID,
  validateStudentID,
  validateIfStudentIsEnrolled
];

router.get('/courseenrollments', getAllEnrollmentsOfCourses);

router.get(
  '/student/:studentID/course/:courseID',
  ...validation,
  getOneEnrollment
);

router.post(
  '/student/:studentID/course/:courseID',
  ...validation,
  validateCourseEnrollmentBody,
  updateEnrollment,
  enrollAStudentInCourse,
);

router.delete(
  '/student/:studentID/course/:courseID',
  ...validation,
  removeEnrollment,
  unenrollAStudentInCourse,
);

router.put(
  '/student/:studentID/course/:courseID',
  ...validation,
  validateCourseEnrollmentBody,
  editEnrollment
);

router.get('/resultTypes', getCourseEnrollmentDropdowns);

module.exports = router;
