const AppError = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const User = require('../models/user.model');

const validateRegistration = catchAsync(async (req, res, next) => {
  const { password, email, user_type } = req.body;

  if (!password || !email || !user_type) {
    next(new AppError('One or more input fields are missing', 403));
    return;
  }
  req.user = {
    email,
    password,
    user_type,
  };
  // checks if email is in use
  const userByEmail = await User.findUserByCriteria('email', email);

  if (userByEmail) {
    return next(new AppError('User with that email already exists', 403));
  }
  next();
});

module.exports = {
  validateRegistration,
};
