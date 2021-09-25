const router = require("express").Router();
const jwt = require("jsonwebtoken");
const csv = require("fast-csv");

require("dotenv").config();

const Organization = require("../../models/Organization");
const Class = require("../../models/Class");
const Student = require("../../models/Student");
const validateStudent = require("../../validation/students/studentValidation");
const validateClass = require("../../validation/classes/classValidation");

// TEST ROUTE
router.get("/test", (req, res) => res.json({msg: "Classes route working"}));

// @route   GET api/classes/:id/students
// @desc    Gets a class' hired and unhired students
// @access  Private
router.get("/:id/students", (req, res) => {
  const id = req.params.id;

  Class.findById(id)
    .populate({
      path: "students",
      options: {
        sort: {hired: 1, firstname: 1, lastname: 1}
      }
    })
    .then(aClass => {
      if (!aClass) {
        return res.status(404).json({class: "That class does not exist"});
      }
      res.json({students: aClass.students, querying: false});
    });
});

// @route   GET api/classes/:id/students/query
// @desc    Queries a class' hired and unhired students
// @access  Private
router.get("/:id/students/:query", (req, res) => {
  const id = req.params.id;
  const query = req.params.query;

  Class.findById(id)
    .populate({
      path: "students",
      options: {sort: {hired: 1, lastname: 1, firstname: 1}}
    })
    .then(aClass => {
      if (!aClass) {
        return res.status(404).json({class: "That class does not exist"});
      }
      let result = aClass.students.filter(aStudent => {
        email = aStudent.email.toLowerCase().split(".");
        email.pop();
        email = email.join(".");
        return (
          aStudent.firstname.toLowerCase().includes(query.toLowerCase()) ||
          aStudent.lastname.toLowerCase().includes(query.toLowerCase()) ||
          email.includes(query.toLowerCase()) ||
          aStudent.github.toLowerCase().includes(query.toLowerCase())
        );
      });
      res.json({students: result, querying: true});
    })
    .catch(err => console.log(err));
});

// @route   POST api/classes/:id/students/create
// @desc    Creates a new student
// @access  Private
router.post("/:id/students/create", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const {errors, isValid} = validateStudent(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const {firstname, lastname, email, github} = data;

  Class.findById(id)
    .populate({
      path: "students",
      select: ["email", "github"],
      match: {$or: [{email}, {github}]}
    })
    .then(aClass => {
      if (!aClass) {
        return res.status(404).json({class: "That class does not exist"});
      }

      if (aClass.students.length) {
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

      const newStudent = new Student({
        firstname,
        lastname,
        email,
        github
      });
      newStudent.save().then(created => {
        aClass.students.push(created._id);
        aClass.save();
        res.status(201).json(created);
      });
    });
});

// @route   PUT api/classes/:id/update
// @desc    Updates the class' info
// @access  Private
router.put("/:id/update", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const {errors, isValid} = validateClass(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const name = data.name;

  Organization.findById(data.orgId)
    .populate({path: "classes", match: {name}})
    .then(org => {
      if (!org) {
        return res
          .status(404)
          .json({organization: "That organization does not exist"});
      }

      if (org.classes.length) {
        return res.status(400).json({
          name: "This organization already has a class with that name"
        });
      }

      Class.findByIdAndUpdate(id, data).then(updated => {
        res.json(updated);
      });
    });
});

// @route   DELETE api/classes/:id/delete
// @desc    Deletes the class and it's students
// @access  Private

router.delete("/:id/delete", (req, res) => {
  const id = req.params.id;

  Class.findByIdAndRemove(id).then(removedClass => {
    removedClass.students.forEach(aStudent => {
      Student.findByIdAndRemove(aStudent);
    });
    res.json(removedClass);
  });
});

// @route   POST api/classes/:name/importcsv
// @desc    Adds a csv of students to the class
// @access  Private
router.post("/:id/importcsv", (req, res) => {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  // Reference
  const csvClassFile = req.files.file;
  const classID = req.params.id;

  // Parse csv and check for existing class in db
  async function run() {
    csv
      .fromString(csvClassFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
      })
      .validate(function (data) {
        return Student.count({email: data.email}, function (err, count) {
          if (count === 0) return;
        });
      })
      .on("data-invalid", function (data) {
        console.log(
          `Student ${data["firstname"]} ${data["lastname"]} already exists.`
        );
      })
      .on("data", function (data) {
        Class.findById(classID).then(aClass => {
          if (!aClass) {
            return res
              .status(404)
              .json({class: "That class does not exist."});
          }

          let newStudent = new Student();

          newStudent.firstname = data["firstname"];
          newStudent.lastname = data["lastname"];
          newStudent.email = data["email"];
          newStudent.github = data["github"];

          newStudent
            .save()
            .then(created => {
              aClass.students.push(created._id);
              aClass.save();
              //res.status(201).json(created); //Error: Can't set headers after they are sent.
              console.log(`Saved: ${data["firstname"]} ${data["lastname"]}`);
              res.json(created)
            })
            .catch(err => {
              console.log(err)
              res.json(err)
            });
        });
      });
  }

  run();
});

module.exports = router;
