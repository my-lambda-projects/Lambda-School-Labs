const Validator = require("validator");
const checkEmpty = require("../checkEmpty");

module.exports = function validateClassInput(data) {
  let errors = {};

  data.name = !checkEmpty(data.name) ? data.name : "";

  // name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Class name field is required";
  }

  return {
    errors,
    isValid: checkEmpty(errors)
  };
};
