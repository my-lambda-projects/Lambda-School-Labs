const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Admin = require("../../models/Admin");
const Organization = require("../../models/Organization");
const Class = require("../../models/Class");
const Student = require("../../models/Student");
const validateClass = require("../../validation/classes/classValidation");
const validateOrganization = require("../../validation/organizations/organizationValidation");

const ACCESS_KEY = process.env.ACCESS_KEY;

// @route   GET api/organizations/:id/classes
// @desc    Gets organization's classes
// @access  Private
router.get("/:id/classes", (req, res) => {
  const id = req.params.id;

  Organization.findById(id)
    .populate({ path: "classes", options: { sort: { name: 1 } } })
    .then(org => {
      if (!org) {
        return res
          .status(404)
          .json({ organization: "That organization does not exist" });
      }

      res.json(org.classes);
    });
});

// @route   POST api/organizations/:id/classes/create
// @desc    Creates a new class
// @access  Private
router.post("/:id/classes/create", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateClass(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const name = data.name;

  Organization.findById(id)
    .populate({ path: "classes", match: { name } })
    .then(org => {
      if (!org) {
        return res
          .status(404)
          .json({ organization: "That organization does not exist" });
      }

      if (org.classes.length) {
        return res.status(400).json({
          name: "This organization already has a class with that name"
        });
      }

      const newClass = new Class({ name });
      newClass.save().then(created => {
        org.classes.push(created._id);
        org.save();
        res.status(201).json(created);
      });
    });
});

// @route   PUT api/organizations/:id/update
// @desc    Updates the organization's info
// @access  Private
router.put("/:id/update", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateOrganization(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const name = data.name;

  Organization.findOne({ name }).then(org => {
    if (org) {
      errors.name = "An organization with that name already exists";
      return res.status(400).json(errors);
    }

    Organization.findByIdAndUpdate(id, data).then(updated => {
      res.json(updated);
    });
  });
});

// @route   DELETE api/organizations/:id/delete
// @desc    Deletes the organization and it's classes and students
// @access  Private

router.delete("/:id/delete", (req, res) => {
  const id = req.params.id;

  Organization.findByIdAndRemove(id).then(removedOrg => {
    removedOrg.admins.forEach(orgsAdmin => {
      Admin.findById(orgsAdmin).then(anAdmin => {
        anAdmin.organizations = anAdmin.organizations.filter(
          anOrg => anOrg != id
        );
        anAdmin.save();
      });
    });

    removedOrg.classes.forEach(aClass => {
      Class.findByIdAndRemove(aClass).then(removedClass => {
        removedClass.students.forEach(aStudent => {
          Student.findByIdAndRemove(aStudent).then();
        });
      });
    });

    res.json(removedOrg);
  });
});

module.exports = router;
