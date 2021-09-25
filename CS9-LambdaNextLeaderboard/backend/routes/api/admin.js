const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../../models/Admin");
const Organization = require("../../models/Organization");
const validateRegistration = require("../../validation/admins/registration");
const validateLogin = require("../../validation/admins/login");
const validateOrganization = require("../../validation/organizations/organizationValidation");

const ACCESS_KEY = process.env.ACCESS_KEY;

// @route   GET api/admins/test
// @desc    Tests admins route
// @access  Public
router.get("/test", (req, res) => {
  Admin.find().then(all => res.json(all));
});

// @route   POST api/admins/register
// @desc    Registers new admin
// @access  Public
router.post("/register", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateRegistration(data);

  // Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = data.username;
  const email = data.email;
  const password = data.password;

  Admin.findOne({ username }).then(foundusername => {
    if (foundusername) {
      errors.username = "That username already exists";
    }

    Admin.findOne({ email }).then(admin => {
      if (admin) {
        errors.email = "An account with that email already exists";
      }

      if (errors.username || errors.email) return res.status(400).json(errors);
      const newAdmin = new Admin({ username, password, email });

      bcrypt.genSalt(11, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) return res.status(400).json(err);
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(created => res.status(201).json(created))
            .catch(err => console.log(err));
        });
      });
    });
  });
});

// @route   POST api/admins/login
// @desc    Login admin and return JWT
// @access  Public
router.post("/login", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateLogin(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = data.email;
  const password = data.password;

  Admin.findOne({ email })
    .select("+password")
    .then(admin => {
      if (!admin) {
        errors.invalidLogin = "Invalid Credentials";
        return res.status(400).json(errors);
      }

      // Check Password
      bcrypt.compare(password, admin.password).then(isMatch => {
        if (isMatch) {
          // Successful login creating token
          const payload = { id: admin._id, username: admin.username };
          jwt.sign(payload, ACCESS_KEY, { expiresIn: "60m" }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              username: admin.username,
              id: admin._id
            });
          });
        } else {
          errors.invalidLogin = "Invalid Credentials";
          return res.status(400).json(errors);
        }
      });
    });
});

// @route   POST api/admins/update
// @desc    Login admin and return JWT
// @access  Public
router.put("/update", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateLogin(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = data.username;
  const oldPassword = data.oldPassword;
  let newPassword = data.password;
  const email = data.email;

  Admin.findOne({ email })
    .select("+password")
    .then(admin => {
      if (!admin) {
        errors.invalidLogin = "Invalid Credentials";
        return res.status(400).json(errors);
      }

      // Check Password
      bcrypt.compare(oldPassword, admin.password).then(isMatch => {
        if (isMatch) {
          bcrypt.genSalt(11, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) return res.status(400).json(err);
              newPassword = hash;
              const updateUser = {
                username: username,
                password: newPassword,
                email: email
              };
              Admin.findByIdAndUpdate(admin._id, updateUser, { new: true })
                .then(admin => res.status(201).json(admin))
                .catch(err => console.log(err));
            });
          });
        } else {
          errors.invalidLogin = "Invalid Credentials";
          return res.status(400).json(errors);
        }
      });
    });
});

// @route   GET api/admins/:id/organizations
// @desc    Gets all of the admin's organizations
// @access  Private
router.get(
  "/:id/organizations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;

    Admin.findById(id)
      .populate({ path: "organizations", options: { sort: { name: 1 } } })
      .then(admin => {
        if (!admin) {
          return res.status(404).json({ user: "That user does not exist" });
        } else {
          res.json(admin.organizations);
        }
      });
  }
);

// @route   POST api/admins/:id/organizations/create
// @desc    Creates a new organization
// @access  Private
router.post(
  "/:id/organizations/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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

      Admin.findById(id).then(admin => {
        if (!admin) {
          return res.status(404).json({ user: "That user does not exist" });
        }

        const newOrg = new Organization({ name, admins: [admin._id] });
        newOrg.save().then(created => {
          admin.organizations.push(created._id);
          admin.save();
          res.status(201).json(created);
        });
      });
    });
  }
);

module.exports = router;
