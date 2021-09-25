const AppError = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const Model = require('../models/model.js');
const Staff = require('../models/staff.model');

// Create Staff Middleware identify req.user, req.staff and validate for errors
const validateCreateStaff = catchAsync(async (req, res, next) => {
  const {
    password,
    email,
    name,
    cpr,
    mobile_number,
    accent,
    gender,
    birthdate,
    teaching_rate,
    user_type,
    active,
  } = req.body;
  
  req.user = {
    user_type,
    email,
    name,
    password,
  };

  req.staff = {
	teaching_rate,
	cpr: cpr || null,
	mobile_number: mobile_number || null,
	gender,
	accent: accent || null,
	birthdate: birthdate || null,
	active,
};

if (
    user_type === null ||
    user_type === undefined ||
    !email ||
    !name ||
    !password ||
    !gender
  ) {
    next(new AppError('Wrong Body', 400));
    return;
  }

  // CHECKS IF EMAIL OR CPR IS IN USE
	if (email) {
		const userByEmail = await Model.findByEmail({ email });
		if (userByEmail) {
			return next(new AppError('User with that email already exists', 401));
		}
	}

	if (cpr) {
		const staffByCPR = await Staff.findByCPR(cpr);
		if (staffByCPR) {
			return next(
				new AppError('Staff member with that CPR already exists', 401)
			);
		}
	}

	next();
});

// Edit Staff Middleware to identify req.user, req.staff and validate for errors
const validateEditStaff = catchAsync(async (req, res, next) => {
  const {
    email,
    name,
    cpr,
    mobile_number,
    accent,
    gender,
    birthdate,
    teaching_rate,
	user_type,
    active,
  } = req.body;
 
  req.user = {
	user_type,
    email,
    name,
  };

	req.staff = {
		teaching_rate,
		cpr: cpr || null,
		mobile_number: mobile_number || null,
		gender,
		accent: accent || null,
		birthdate: birthdate || null,
		active,
	};

	if (user_type === null || user_type === undefined || !email || !name || !gender) {
		return next(new AppError('Wrong Body', 400));
	}

	// CHECKS IF EMAIL OR CPR IS IN USE
	const userByEmail = await Model.findByEmail({ email });
	if (userByEmail && userByEmail.id !== req.staffUser.user_id) {
		return next(new AppError('User with that email already exists', 401));
	}

	if (cpr) {
		const staffByCPR = await Staff.findByCPR(cpr);
		if (staffByCPR && staffByCPR.staff_id !== req.staffUser.staff_id) {
			return next(
				new AppError('Staff member with that CPR already exists', 401)
			);
		}
	}
	next();
});

// Middleware for validating StaffId 
const validateStaffID = (req, res, next) => {
	const staffID = +req.params.staffID;
	if (isNaN(staffID)) {
		return next(new AppError('Please enter a valid ID', 401));
	}
	req.staffID = staffID;
	next();
};

const checkIfStaffExistsByID = catchAsync(async (req, res, next) => {
	const staff = await Staff.findByID(req.staffID);
	if (!staff) {
		next(new AppError('Staff with that ID does not exist', 406));
		return;
	}
	req.staffUser = staff;
	next();
});

module.exports = {
	validateCreateStaff,
	validateStaffID,
	validateEditStaff,
	checkIfStaffExistsByID,
};
