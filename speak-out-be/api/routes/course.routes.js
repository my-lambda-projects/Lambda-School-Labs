const express = require('express');

const {
  findCourseById,
  findAllCourses,
  createACourse,
  editACourse,
  deleteACourse,
  populateCourseDropdowns,
  getAllStudentsInACourse
} = require('../controllers/course.controller');

const {
  validateCourseBody,
  validateCourseID
} = require('../middlewares/course.middleware');

const router = express.Router();

router.param('courseID', validateCourseID);

router.get('/course', findAllCourses);
router.post('/course', validateCourseBody, createACourse);
router.get('/course/dropdowns', populateCourseDropdowns);
router.get('/course/:courseID', findCourseById);
router.get('/course/:courseID/students', getAllStudentsInACourse);
router.put('/course/:courseID', validateCourseBody, editACourse);
router.delete('/course/:courseID', deleteACourse);

module.exports = router;
