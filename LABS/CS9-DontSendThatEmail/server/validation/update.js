const Validator = require("validator");
const isEmpty = require("../validation/is-empty");

// Validation for updating user email and password
// Also checks length of characters
const validateUpdateInput = ({ email, password }) => {
  let errors = {};
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (Validator.isEmpty(email)) {
    errors.email = "email is required";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

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

module.exports = validateUpdateInput;
