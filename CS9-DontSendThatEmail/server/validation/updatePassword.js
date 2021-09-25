const Validator = require("validator");
const isEmpty = require("../validation/is-empty");

// Validates length of password and ensures input field is not empty
const validateUpdatePassword = ({ email, password }) => {
  let errors = {};
  password = !isEmpty(password) ? password : "";

  if (Validator.isEmpty(password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be greater than 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateUpdatePassword;
