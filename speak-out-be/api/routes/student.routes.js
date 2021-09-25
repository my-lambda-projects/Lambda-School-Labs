const express = require('express');

const {
  findAllStudents,
  findStudentById,
  deleteAStudent,
  createAStudent,
  editAStudent,
  getDropdowns,
  getAllCoursesOfStudent
} = require('../controllers/student.controller');

const {
  validateStudentID,
  validateStudentBody
} = require('../middlewares/student.middleware');

const router = express.Router();

router.param('studentID', validateStudentID);

router.get('/student/dropdowns', getDropdowns);
router.get('/students', findAllStudents);
router.post('/student', validateStudentBody, createAStudent);
router.get('/student/:studentID', findStudentById);
router.get(
  '/student/:studentID/courses',
  getAllCoursesOfStudent
);
router.put(
  '/student/:studentID',
  validateStudentBody,
  editAStudent
);
router.delete('/student/:studentID', deleteAStudent);

module.exports = router;
