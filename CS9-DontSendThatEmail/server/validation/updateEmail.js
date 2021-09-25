const Validator = require("validator");
const isEmpty = require("../validation/is-empty");

// Validating if user email is valid using Validator when user updates
const validateUpdateEmail = ({ email, password }) => {
  let errors = {};
  email = !isEmpty(email) ? email : "";

  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateUpdateEmail;
