const bcrypt = require('bcrypt');

const { catchAsync } = require('../utils/catchAsync');

const Staff = require('../models/staff.model');
const Course = require('../models/course.model');


const findStaffById = catchAsync(async (req, res, next) => {
  return res.status(200).json(req.staffUser);
});

const findAllStaff = catchAsync(async (req, res) => {
  const allStaff = await Staff.find(req.query);
  return res.status(200).json(allStaff);
});

const findStaffByUserId = (req, res) => {
  const id = req.params.userId;
  if (!id) {
    res.status(404).json({message: 'user id is required'});
  } else {
    Staff.findStaffByUserId(id)
    .then(found => {
      if (!found) {
        res.status(400).json({message:'no staff found with that user id'})
      } else {
        res.status(200).json(found)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "there was a problem finding that staff", err
      })
    })
  }
} 

//Hash Staff Password and plug in user & staff info into separate tables
const createAStaff = catchAsync(async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.user.password, 10);
  req.user = { ...req.user, password: hashedPassword };
  const newStaffID = await Staff.create(req.user, req.staff);
  const newStaff = await Staff.findByID(newStaffID[0]);
  return res.status(201).json(newStaff);
});

const editAStaff = catchAsync(async (req, res) => {
  await Staff.edit(req.staffID, req.user, req.staff);
  const edited = await Staff.findByID(req.staffID);
  return res.status(201).json(edited);
});

const deleteAStaff = catchAsync(async (req, res) => {
  await Staff.remove(req.staffID);
  return res.status(200).json({ message: 'Staff Deleted' });
});

const getAllCoursesByStaff = catchAsync(async (req, res) => {
  const courses = await Course.findCoursesByTeacherID(req.staffID);
  res.status(200).json(courses);
});

module.exports = {
  findStaffById,
  findAllStaff,
  createAStaff,
  editAStaff,
  deleteAStaff,
  getAllCoursesByStaff,
  findStaffByUserId
};
