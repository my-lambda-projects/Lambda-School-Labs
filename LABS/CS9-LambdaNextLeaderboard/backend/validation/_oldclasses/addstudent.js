const Validator = require("validator");
const checkEmpty = require("../checkEmpty");

module.exports = function validateAddStudentInput(data) {
  let errors = {};

  data.lastname = !checkEmpty(data.lastname) ? data.lastname : "";
  data.firstname = !checkEmpty(data.firstname) ? data.firstname : "";
  data.email = !checkEmpty(data.email) ? data.email : "";
  data.github = !checkEmpty(data.github) ? data.github : "";
  data.huntr = !checkEmpty(data.huntr) ? data.huntr : "";

  // lastname
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name is required";
  } else if (!Validator.isLength(data.lastname, { max: 35 })) {
    errors.lastname = "Last name can't be more than 35 characters";
  } else if (!Validator.isAlpha(data.lastname)) {
    errors.lastname = "Last name can only be letters";
  }

  // firstname
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First name is required";
  } else if (!Validator.isLength(data.firstname, { max: 35 })) {
    errors.firstname = "First name can't be more than 35 characters";
  } else if (!Validator.isAlpha(data.firstname)) {
    errors.firstname = "First name can only be letters";
  }

  // email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // github
  if (Validator.isEmpty(data.github)) {
    errors.github = "Github handle is required";
  }

  // huntr
  if (Validator.isEmpty(data.huntr)) {
    errors.huntr = "Huntr handle is required";
  }

  return {
    errors,
    isValid: checkEmpty(errors)
  };
};
