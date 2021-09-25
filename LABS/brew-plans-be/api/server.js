const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()



const checkIfAuthenticated = require('../database/auth/middle-ware.js')
const createUser = require('../database/auth/createUser.js')

const usersRouter = require('../database/models_routers/users/usersRouter.js')
const ingredientsRouter = require('../database/models_routers/ingredients/ingredientsRouter.js')
const userRecipeRouter = require('../database/models_routers/user_recipes/user_recipes_router.js')
const seededRecipeRouter = require('../database/models_routers/seeded_recipes/seeded_recipes_router.js')
const instructionsRouter = require('../database/models_routers/instructions/instructions_router.js')
const logsRouter = require("../database/models_routers/logs/logs_router");


const server = express();

server.use(require("morgan")("combined"));
server.use(require("body-parser").urlencoded({ extended: true }));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/users", usersRouter);
// server.use('/users', checkIfAuthenticated, usersRouter);

server.use("/ingredients", ingredientsRouter);
// server.use('/ingredients', checkIfAuthenticated, ingredientsRouter)

server.use("/userrecipes", userRecipeRouter);
// server.use('/userrecipes', checkIfAuthenticated, userRecipeRouter)

server.use("/seededrecipes", seededRecipeRouter);
// server.use('/seededrecipes', checkIfAuthenticated, seededRecipeRouter)

server.use("/instructions", instructionsRouter);

server.use("/logs", logsRouter);

server.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// server.use(passport.initialize());
// server.use(passport.session());

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//       return next();

//   res.sendStatus(401);
// }

server.post("/auth/signup", createUser);

//test endpoints
// server.get('/', (req, res) => {
//     res.status(200).json({ api: 'up' });
// });

// server.post('/login',
//   passport.authenticate('local', { failureRedirect: '/' }),
//     (req, res) => {
//         res.redirect('/master');
//       });

server.get("/master", checkIfAuthenticated, (req, res) => {
  res.redirect("/users/allusers");
});

// server.get('/logout', function(req, res) {
//   req.logout();
//       res.send('logged out');
//         });

module.exports = server;

// const passport = require('passport');
// var config = require('../oauth.js');
// var GoogleStrategy = require('passport-google-oauth2').Strategy;
// const LocalStrategy = require('passport-local').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: 449923889220-pa3veecaq72o4tiairfrputrj7f0dp2n.apps.googleusercontent.com,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   UsersDB.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

// passport.use('local' , new LocalStrategy(
//     function(username, password, done) {
//         UsersDB.FindByUsername({ username: username }, function (err, user) {
//         if (err) {
//           return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));

// passport.serializeUser(function (user, done) {
//   done(null, UsersDB[0].id);
// });
// passport.deserializeUser(function (id, done) {
//   done(null, UsersDB[0]);
// });

// passport.use('local', new LocalStrategy(
//     function(username, password, done) {
//         UsersDB.FindByUsername({ username: username }, function (err, user) {
//         if (err) {
//           return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));

// var users = [
//   { id: 1, username: 'testing1@gmail.com', password: "testingseed1" }
// ];

// passport.serializeUser(function (user, done) {
//   done(null, users[0].id);
// });
// passport.deserializeUser(function (id, done) {
//   done(null, users[0]);
// });

// passport.use('local', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// },

//   function (username, password, done) {
//       if (username === users[0].username && password === users[0].password) {
//           return done(null, users[0]);
//       } else {
//           return done(null, false, {"message": "User not found."});
//       }
//   })
// );
