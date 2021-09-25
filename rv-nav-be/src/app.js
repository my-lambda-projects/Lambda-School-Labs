const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const generateToken = require("../auth/gen-token.js").generateToken;
const protectedRoute = require("../auth/gen-token.js").protectedRoute;

require("dotenv").config();

const middlewares = require("./middlewares");

const app = express();
//sentry.io
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://3b0688b85a2b4a7b836501adec1ed46c@sentry.io/1538856"
});

const usersRouter = require("../users/users-router.js");
const vehicleRouter = require("../vehicles/vehicle-router.js");

// allow cross origin access for dev server and hosted app
let whiteList = [
  "https://www.rvnav.com",
  "http://localhost:3000",
  "https://rvnavstaging1.netlify.com",
  "https://rvnavstaging2.netlify.com"
];
let corsOptions = {
  origin: function(origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// This request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(morgan("dev"));
app.use(helmet());
// app.use(cors(corsOptions));
app.use(express.json());

// Enables cors preflight across the board
// app.options("*", cors())

app.options("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.sendStatus(200);
});

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// SANITY CHECK ENDPOINT
app.get("/", (req, res) => {
  res.json({
    message: "Hello From  RV Road Life with Ryan"
  });
});

// ROUTER ENDPOINTS
app.use("/users", usersRouter);
app.use("/vehicle", protectedRoute, vehicleRouter);

//sentry.io
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// CUSTOM 404 & ERROR HANDLER
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
