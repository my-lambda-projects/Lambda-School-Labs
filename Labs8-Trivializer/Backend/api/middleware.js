// Inserts middleware between the request and endpoints
const helmet = require("helmet"); // Provides additional safety features and headers in HTTP requests
const morgan = require("morgan"); // logs useful information to the console when making API calls
const express = require("express"); // express handles all our routing needs
const cors = require("cors"); // Enables cross origin requests

const CORS_WHITELIST = require("../constants/frontend");

const corsOptions = {
  origin: (origin, callback) => 
    CORS_WHITELIST.indexOf(origin) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"))
};

module.exports = server => {
  server.use(helmet());
  server.use(cors(corsOptions));
  server.use(morgan("dev"));
  server.use(express.json());
};
