const AppError = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

const CourseEnrollment = require('../models/course_enrollment.model');

const enrollAStudentInCourse = catchAsync(async (req, res, next) => {
  if (req.enrolledStudent) {
    return next(
      new AppError('This student is already enrolled in this course', 400)
    );
  }
  const [id] = await CourseEnrollment.create(req.courseEnrollment);
  const enrollment = await CourseEnrollment.findByID(id);
  res.status(201).json(enrollment);
});

const unenrollAStudentInCourse = catchAsync(async (req, res, next) => {
  if (!req.enrolledStudent) {
    return next(
      new AppError('This student is not enrolled in the course', 400)
    );
  }
  await CourseEnrollment.remove(req.studentID, req.courseID);
  res.status(200).json({ message: 'Student unenrolled from this course' });
});

const editEnrollment = catchAsync(async (req, res, next) => {
  if (!req.enrolledStudent) {
    return next(
      new AppError('This student is not enrolled in the course', 400)
    );
  }

  const [id] = await CourseEnrollment.edit(
    req.studentID,
    req.courseID,
    req.courseEnrollment
  );
  const enrollment = await CourseEnrollment.findByID(id);
  res.status(200).json(enrollment);
});

const getAllEnrollmentsOfCourses = catchAsync(async (req, res, next) => {
  const enrollments = await CourseEnrollment.findAll();

  res.status(200).json(enrollments);
});

const getOneEnrollment = catchAsync(async (req, res, next) => {
  if (!req.enrolledStudent) {
    return next(
      new AppError('This student is not enrolled in the course', 400)
    );
  }
  res.status(200).json(req.enrolledStudent);
});

const getCourseEnrollmentDropdowns = catchAsync(async (req, res, next) => {
  const resultTypes = await CourseEnrollment.getResultTypes();
  res.status(200).json(resultTypes);
});

module.exports = {
  enrollAStudentInCourse,
  unenrollAStudentInCourse,
  editEnrollment,
  getAllEnrollmentsOfCourses,
  getOneEnrollment,
  getCourseEnrollmentDropdowns
};
