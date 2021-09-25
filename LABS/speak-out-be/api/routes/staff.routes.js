const express = require('express');
const Staff = require('../models/staff.model');

const {
  findStaffById,
  findAllStaff,
  createAStaff,
  editAStaff,
  deleteAStaff,
  getAllCoursesByStaff,
  findStaffByUserId
} = require('../controllers/staff.controller');

const {
  validateCreateStaff,
  validateEditStaff,
  validateStaffID,
  checkIfStaffExistsByID
} = require('../middlewares/staff.middleware'); 


const router = express.Router(); 

router.param('staffID', validateStaffID);

router.get('/staff', findAllStaff);
router.post('/staff', validateCreateStaff, createAStaff);
router.get('/staff/:staffID', checkIfStaffExistsByID, findStaffById);
router.get(
  '/staff/:staffID/courses',
  checkIfStaffExistsByID,
  getAllCoursesByStaff
);

router.get('/staffdashboard/:userId', findStaffByUserId);

router.put(
  '/staff/:staffID',
  checkIfStaffExistsByID,
  validateEditStaff,
  editAStaff
);
router.delete('/staff/:staffID', checkIfStaffExistsByID, deleteAStaff);

module.exports = router;
