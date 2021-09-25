const Validator = require("validator");
const isEmpty = require("../validation/is-empty");

// Validates input fields for registration of new user
const validateRegisterInput = ({ username, email, password, password2 }) => {
  let errors = {};
  username = !isEmpty(username) ? username : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  password2 = !isEmpty(password2) ? password2 : "";

  if (!Validator.isLength(username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(username)) {
    errors.username = "Username is required";
  }

  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
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

  if (Validator.isEmpty(password2)) {
    errors.password2 = "Password confirmation is required";
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords don't match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
