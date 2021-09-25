const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Class = require("../../models/Class");
const Student = require("../../models/Student");
const validateStudent = require("../../validation/students/studentValidation");

// @route   PUT api/students/:id/update
// @desc    Updates a student's info
// @access  Private
router.put("/:id/update", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateStudent(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const { classId, firstname, lastname, email, github, hired } = data;

  Class.findById(classId)
    .populate({
      path: "students",
      select: ["email", "github"],
      match: { $or: [{ email }, { github }] }
    })
    .then(aClass => {
      if (!aClass) {
        return res.status(404).json({ class: "That class does not exist" });
      }

      if (aClass.students.length && aClass.students[0]._id != id) {
        if (aClass.students[0].email === email) {
          errors.email =
            "This class already has a student with that email address";
        }
        if (aClass.students[0].github === github) {
          errors.github =
            "This class already has a student with that Github handle";
        }
        return res.status(400).json(errors);
      }
      const options = {
        new: true
      }
      Student.findByIdAndUpdate(id, {
        firstname,
        lastname,
        email,
        github,
        hired
      }, options).then(updated => {
        res.json(updated);
      });
    });
});

// @route   DELETE api/students/:id/delete
// @desc    Deletes a student by Id
// @access  Private
router.delete("/:id/delete", (req, res) => {
  const id = req.params.id;

  Student.findByIdAndRemove(id).then(removed => {
    res.json(removed);
  });
});

module.exports = router;
