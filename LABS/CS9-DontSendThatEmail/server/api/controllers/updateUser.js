const User = require("../models/user");
const validateUpdateInput = require("../../validation/update");
const validateUpdateEmail = require("../../validation/updateEmail");
const validateUpdatePassword = require("../../validation/updatePassword");

const updateUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) {
      res.status(404).json(err.message);
    }

    // Conditional check using Validator to check which input was passed the request & if it is valid
    if (req.body.email && req.body.password) {
      const { errors, isValid } = validateUpdateInput(req.body);
      if (!isValid) return res.status(400).json(errors);
      else (user.password = password), (user.email = email);
    } else if (req.body.email) {
      const { errors, isValid } = validateUpdateEmail(req.body);
      if (!isValid) return res.status(400).json(errors);
      else user.email = email;
    } else {
      const { errors, isValid } = validateUpdatePassword(req.body);
      if (!isValid) return res.status(400).json(errors);
      else user.password = password;
    }

    user.save(function(err, returnData) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.send(returnData);
    });
  });
};

module.exports = updateUser;
