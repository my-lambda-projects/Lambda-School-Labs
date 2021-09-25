const passport = require("passport");
const authStrategy = require("./auth");

passport.use(authStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;