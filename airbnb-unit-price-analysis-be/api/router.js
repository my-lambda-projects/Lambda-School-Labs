const express = require('express');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const ListingsRouter = require('../listings/listings-router');

// const usersRouter = require('../users/users-router')
const router = express.Router();

const authConfig = {
    domain: "dev-cz8-jv29.auth0.com",
    audience: "https://airbnbupa"
  };
  // Define middleware that validates incoming bearer tokens
  // using JWKS from dev-cz8-jv29.auth0.com
  const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
  });

// router.use('/users', checkJwt, usersRouter)
router.get("/", checkJwt, (req, res) => {
    res.send({
      msg: "Your Access Token was successfully validated!"
    });
  });

router.use('/listings', ListingsRouter);

module.exports = router;