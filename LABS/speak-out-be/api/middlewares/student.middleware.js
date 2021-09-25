const Joi = require('@hapi/joi');

const AppError = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

const Student = require('../models/student.model');

const validateStudentID = catchAsync(
  async (req, res, next) => {
    const studentID = +req.params.studentID;
    if (isNaN(studentID)) {
      next(new AppError('Please enter a valid ID', 400));
      return;
    }
    const student = await Student.findByID(studentID);
    if (!student) {
      return next(
        new AppError(
          'Student with that ID does not exist',
          400
        )
      );
    }
    req.studentID = studentID;
    req.student = student;
    next();
  }
);

const validateStudentBody = catchAsync(
  async (req, res, next) => {
    if (!req.body.registration_date) {
      delete req.body.registration_date;
    }
    if (!req.body.grade_updated) {
      delete req.body.grade_updated;
    }
    
    const schema = Joi.object({
      // REQUIRED
      cpr: Joi.string().required(),
      additional_names: Joi.string().required(),
      first_name: Joi.string().required(),
      gender: Joi.string().required(),
      birthdate: Joi.string().required(),
      primary_emergency_contact_name: Joi.string().required(),
      primary_emergency_relationship: Joi.string().required(),
      primary_emergency_phone: Joi.string().required(),
      school_grade: Joi.string().required(),
      user_id: Joi.number().integer().required(),
      address: Joi.string().required(),
      phone_number: Joi.string().required(),

      /// NOT REQUIRED
      registration_date: Joi.string(),
      school_name: Joi.string(),
      grade_updated: Joi.string(),
      email: Joi.string(),
      emergency_relationship: Joi.string().allow(''),
      emergency_contact_name: Joi.string().allow(''),
      emergency_phone: Joi.string().allow(''),
      notes: Joi.string().allow(''),
      no_call: Joi.boolean(),
      delinquent: Joi.boolean(),
      expelled: Joi.boolean(),
      attempts: Joi.number().integer()
    });
    await schema.validateAsync(req.body);
    next();
  }
);

module.exports = {
  validateStudentID,
  validateStudentBody
};
