const Validator = require("validator");
const isEmpty = require("../validation/is-empty");

// Validates length of username/password and ensures input fields are not empty
const validateLoginInput = ({ username, password }) => {
  let errors = {};
  username = !isEmpty(username) ? username : "";
  password = !isEmpty(password) ? password : "";

  if (!Validator.isLength(username, { min: 3, max: 16 })) {
    errors.username = "Username must be between 3 and 16 characters";
  }

  if (Validator.isEmpty(username)) {
    errors.username = "Username is required";
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

module.exports = validateLoginInput;
