require("dotenv").config();
const express = require("express");
// const helmet = require("helmet");
// const forever = require("forever");

// Required for Stripe to work
const cors = require("cors");

//Routes
const stripeApi = require("../routes/api/stripe");
const userRoute = require("../routes/api/users");
const fileRoute = require("../routes/api/files");
const downloadRoute = require("../routes/api/downloads");
const s3Route = require("../routes/api/s3");
const sendgrid = require("../routes/api/sendgrid.js");

var port = process.env.PORT || 3000,
  http = require("http"),
  fs = require("fs"),
  html = fs.readFileSync("index.html");

// server
const server = express();
server.use(express.json());
server.use(cors());

//routes
server.use("/api/users/", userRoute);
server.use("/api/files/", fileRoute);
server.use("/api/downloads/", downloadRoute);
server.use("/api/s3/", s3Route);
server.use("/api/stripe", stripeApi);
server.use("/api/sendgrid", sendgrid);

module.exports = server;
