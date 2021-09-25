const { catchAsync } = require('../utils/catchAsync');

const Student = require('../models/student.model');
const CourseEnrollment = require('../models/course_enrollment.model');

const findAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.findAll();
  return res.status(200).json(students);
});

const findStudentById = (req, res) => {
  return res.status(200).json(req.student);
};

const deleteAStudent = catchAsync(async (req, res) => {
  await Student.remove(req.studentID);
  return res.status(200).json({ message: 'Student Deleted' });
});

const createAStudent = catchAsync(async (req, res) => {
  const [newStudent] = await Student.create(req.body);
  const student = await Student.findByID(newStudent.id);
  res.status(201).json(student);
});

const editAStudent = catchAsync(async (req, res) => {
  const [editedStudent] = await Student.update(req.studentID, req.body);
  const student = await Student.findByID(editedStudent.id);
  res.status(200).json(student);
});

const getAllCoursesOfStudent = catchAsync(async (req, res) => {
  const courses = await CourseEnrollment.findCoursesByStudentID(req.studentID);
  res.status(200).json(courses);
});

const getDropdowns = catchAsync(async (req, res) => {
  const dropdowns = [
    Student.getAllSchoolGrades()
  ];
  const [
    school_grades
  ] = await Promise.all(dropdowns);
  return res.status(200).json({
    school_grades
  });
});

module.exports = {
  findAllStudents,
  findStudentById,
  deleteAStudent,
  createAStudent,
  editAStudent,
  getDropdowns,
  getAllCoursesOfStudent
};
