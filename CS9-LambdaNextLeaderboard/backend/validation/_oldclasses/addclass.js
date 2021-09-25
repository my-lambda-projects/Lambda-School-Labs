const Validator = require("validator");
const checkEmpty = require("../checkEmpty");

module.exports = function validateAddClassInput(data) {
  let errors = {};

  data.name = !checkEmpty(data.name) ? data.name : "";

  // name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Class name is required";
  } else if (!Validator.isLength(data.name, { max: 20 })) {
    errors.name = "Class name can't be more than 20 characters";
  }

  return {
    errors,
    isValid: checkEmpty(errors)
  };
};
