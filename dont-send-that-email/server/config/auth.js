const Auth0Strategy = require("passport-auth0");
const authStrategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL
}, (token, refresh, params, profile, done) => {
  return done(null, profile);
});

module.exports = authStrategy;