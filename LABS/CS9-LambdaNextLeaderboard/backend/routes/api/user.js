// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const passport = require("passport");

// const Admin = require("../../models/Admin");
// const CoAdmin = require('../../models/CoAdmin')
// const validateRegistration = require("../../validation/users/registration");
// const validateLogin = require("../../validation/users/login");

// const ACCESS_KEY = process.env.ACCESS_KEY;

// // @route   GET api/users/test
// // @desc    Tests users route
// // @access  Public
// router.get("/test", (req, res) => res.json({msg: "Users route working"}));

// // @route   POST api/users/register
// // @desc    Registers new user
// // @access  Public
// router.post("/register", (req, res) => {
//     const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
//     // const {errors, isValid} = validateRegistration(data);

//     // Validation Check
//     // if (!isValid) {
//     //     return res.status(400).json(errors);
//     // }

//     const username = data.username;
//     const password = data.password;
//     const email = data.email;
//     const organization = data.organization;

//     Admin.findOne({username}).then(user => {
//         if (user) {
//             errors.username = "Username already exists";
//             return res.status(400).json(errors);
//         } else {
//             const newUser = new Admin({
//                 username: username,
//                 password: password,
//                 email: email,
//                 organization: organization
//             });

//             bcrypt.genSalt(11, (err, salt) => {
//                 bcrypt.hash(newUser.password, salt, (err, hash) => {
//                     if (err) return res.status(400).json(err);
//                     newUser.password = hash;
//                     newUser
//                         .save()
//                         .then(created => res.json(created))
//                         .catch(err => console.log(err));
//                 });
//             });
//         }
//     });
// });

// // @route   POST api/users/login
// // @desc    Login user and return JWT
// // @access  Public
// router.post("/login", (req, res) => {
//     const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
//     // const {errors, isValid} = validateLogin(data);

//     // Validation Check
//     // if (!isValid) {
//     //     return res.status(400).json(errors);
//     // }

//     const username = data.username;
//     const password = data.password;
//     const coadmin = data.coadmin;
//     if (coadmin) {
//         CoAdmin.findOne({username})
//             .select("+password")
//             .then(user => {
//                 if (!user) {
//                     errors.username = "Username not found";
//                     return res.status(404).json(errors);
//                 }

//                 // Check Password
//                 bcrypt.compare(password, user.password).then(isMatch => {
//                     if (isMatch) {
//                         // Successful login creating token
//                         const payload = {id: user._id, name: user.username};
//                         jwt.sign(payload, ACCESS_KEY, {expiresIn: "10h"}, (err, token) => {
//                             res.json({
//                                 success: true,
//                                 token: "Bearer " + token,
//                                 username: user.username,
//                                 id: user._id,
//                                 organization: user,
//                             });
//                         });
//                     } else {
//                         errors.password = "Invalid Credentials";
//                         return res.status(400).json(errors);
//                     }
//                 });
//             });

//     } else {
//         Admin.findOne({username})
//             .select("+password")
//             .then(user => {
//                 if (!user) {
//                     errors.username = "Username not found";
//                     return res.status(404).json(errors);
//                 }

//                 // Check Password
//                 bcrypt.compare(password, user.password).then(isMatch => {
//                     if (isMatch) {
//                         // Successful login creating token
//                         const payload = {id: user._id, name: user.username};
//                         jwt.sign(payload, ACCESS_KEY, {expiresIn: "10h"}, (err, token) => {
//                             res.json({
//                                 success: true,
//                                 token: "Bearer " + token,
//                                 username: user.username,
//                                 id: user._id,
//                                 organization: user,
//                             });
//                         });
//                     } else {
//                         errors.password = "Invalid Credentials";
//                         return res.status(400).json(errors);
//                     }
//                 });
//             });
//     }

// });
// // @route    PUT api/users/update
// // @desc     Return current user
// // @access   Private
// router.put("/updateuser", (req, res) => {
//     // const {errors, isValid} = validateUpdateStudentInput(req.body);
//     //   // Validation Check
//     //   if (!isValid) {
//     //       return res.status(400).json(errors);
//     //   }
//     const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
//     console.log('testing update', data)
//     const username = data.username;
//     const oldPassword = data.oldPassword;
//     const newPassword = data.newPassword;
//     const email = data.email;
//     const organization = data.organization;
//     const coadmin = data.coadmin;
//     const {_id} = req.body;
//     // const id = req.body.id
//     const options = {
//         new: true
//     }
//     const updateUser = {
//         "username": username,
//         "password": newPassword,
//         "email": email,
//         "organization": organization
//     }
//     if (coadmin) {
//         CoAdmin.findOne({username})
//             .select("+password")
//             .then(user => {
//                 if (!user) {
//                     errors.username = "Username not found";
//                     return res.status(404).json(errors);
//                 }

//                 // Check Password
//                 bcrypt.compare(oldPassword, user.password).then(isMatch => {
//                     if (isMatch) {
//                         // Successful login creating token
//                         CoAdmin.findByIdAndUpdate(_id, updateUser, options)
//                             .then(admin => {
//                                 res.send(admin)
//                             })
//                             .catch(err => {
//                                 res.status(500).json(err);
//                             })

//                     } else {
//                         errors.password = "Invalid Credentials";
//                         return res.status(400).json(errors);
//                     }
//                 });
//             });

//     } else {
//         Admin.findOne({username})
//             .select("+password")
//             .then(user => {
//                 if (!user) {
//                     errors.username = "Username not found";
//                     return res.status(404).json(errors);
//                 }

//                 // Check Password
//                 bcrypt.compare(oldPassword, user.password).then(isMatch => {
//                     if (isMatch) {
//                         // Successful login creating token
//                         Admin.findByIdAndUpdate(_id, updateUser, options)
//                             .then(user => {
//                                 res.send(admin)
//                             })
//                             .catch(err => {
//                                 res.status(500).json(admin);
//                             })

//                     } else {
//                         errors.password = "Invalid Credentials";
//                         return res.status(400).json(errors);
//                     }
//                 });
//             });

//     }

// })

// // @route    GET api/users/current
// // @desc     Return current user
// // @access   Private
// router.get(
//     "/current",
//     passport.authenticate("jwt", {session: false}),
//     (req, res) => {
//         res.json({
//             id: req.user.id,
//             username: req.user.username
//         });
//     }
// );

// module.exports = router;
