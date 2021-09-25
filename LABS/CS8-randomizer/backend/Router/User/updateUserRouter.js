const express = require("express");
const router = express.Router();
// const cors = require("cors");

// // ============ from ROUTES ============= //
// Libraries:
// const passport = require("passport");
// const LocalStrategy = require("passport-local");

// const secret = "no size limit on tokens"; //  Called from login User!!?!?!?

// const localStrategy = new LocalStrategy(function(username, password, done) {
//   User.findOne({ username }, function(err, user) {
//     if (err) {
//       done(err);

//       console.log("user in localStrategy (updateUserRouter.js):", user);
//       console.log("username in localStrategy (updateUserRouter.js):", username);
//       console.log("password in localStrategy (updateUserRouter.js):", password);
//     } else if (user) {
//       user.verifyPassword(password, function(err, isValid) {
//         if (err) {
//           return done(err);
//         }
//         if (isValid) {
//           const { _id, username } = user;
//           return done(null, { _id, username });
//         }
//         return done(null, false);
//       });
//     } else {
//       return done(null, false);
//     }
//   });
// });

// passport.use(localStrategy);

//schema
const User = require("../../Schemas/User.js");

router.route("/:id").put((req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  console.log("UPDATE_INFO:", updateInfo);

  User.findOneAndUpdate(
    { _id: id }, // First argument is the "filter"
    { username: updateInfo.username, password: updateInfo.password},
    { new: true }
  )
    .then(response => {
      response.save();
      res.json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
