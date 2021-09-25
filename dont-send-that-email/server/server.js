// Configure ENV variables immediately
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const sessionConfig = require("./config/session");
const passport = require("./config/passport");
const cors = require("./config/cors");
const db = require("./data/dbconfig.js");
const authRouter = require("./routers/auth");
const versionsRouter = require("./routers/versions");
const emailsRouter = require("./routers/emails");
const SERVER_CONFIGS = require("./constants/server");
const paymentsRouter = require("./routers/payments");
const watsonRouter = require("./routers/watson");
const sendEmailRouter = require("./routers/sendEmail");

const app = express();

// Initialize middlewares
app.use(express.json());
app.use(cors());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/versions", versionsRouter);
app.use("/emails", emailsRouter);
app.use("/billing", paymentsRouter);
app.use("/api/watson", watsonRouter);
app.use("/sendemail", sendEmailRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", (req, res) => {
  db("users")
    .select("username", "subscriber")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err =>
      res.status(500).json({ errorMsg: "Unable to retrieve users." })
    );
});

app.post("/users", (req, res) => {
  const user = req.body;
  if (!user.username) {
    res.status(400).json({ errorMsg: "Please enter a username." });
  }
  db("users")
    .insert(user)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err =>
      res
        .status(500)
        .json({ errorMsg: "Unable to add user to user database.", err })
    );
});

app.listen(SERVER_CONFIGS.PORT || 5000, error => {
  if (error) throw error;
  console.log("Server running on port: " + SERVER_CONFIGS.PORT);
});
