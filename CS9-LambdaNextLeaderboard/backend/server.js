require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

// import routes
const admins = require("./routes/api/admin");
const organizations = require("./routes/api/organization");
const classes = require("./routes/api/class");
const students = require("./routes/api/student");
const githubData = require("./data/githubData");
const leaderboard = require("./routes/api/leaderboard");
const customer = require('./routes/api/stripe');

// CSV imports
//const template = require("./template.js");
const upload = require("./utils/upload");

// Middleware
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(fileUpload());
app.use(require("sanitize").middleware);

// // ****START STRIPE****

const CORS_WHITELIST = require("./billing/frontend");
// const WHITELIST = [CORS_WHITELIST, "http://localhost:3000/"];
const corsOptions = {
  origin: (origin, callback) =>
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"))
};

const configureServer = app => {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
};

configureServer(app);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../leaderboard-frontend/build")));

// Connect MongoDB
const db = process.env.MONGO_URI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("=== Connected to MongoDB ===\n"))
  .catch(err => console.log(err));

// Set up passport middleware
app.use(passport.initialize());
require("./authentication/passport")(passport);

// Connect routes
app.use("/api/admins", cors(corsOptions), admins);
app.use(
  "/api/organizations",
  cors(corsOptions),
  passport.authenticate("jwt", { session: false }),
  organizations
);
app.use(
  "/api/classes",
  cors(corsOptions),
  passport.authenticate("jwt", { session: false }),
  classes
);
app.use(
  "/api/students",
  cors(corsOptions),
  passport.authenticate("jwt", { session: false }),
  students
);
app.use(
  "/api/leaderboard",
  cors(corsOptions),
  leaderboard
);

app.use("/api/customer",
  cors(corsOptions),
  customer
);

// CSV routes
// app.get("/template", cors(corsOptions));
// app.post("/create-edit", cors(corsOptions), upload.post);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`\nServer is running on port ${port}`));
