const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/userModel");
const config = require("./config/config");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const userRouter = require("./routers/userRouter");

//GridFs related dependencies
const multer = require('multer');


let gfs;

mongoose
  .connect(
    config.db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => console.error("Failed to connect to DB"));

const server = express();

// use middleware
server.use(express.json());
server.use(helmet());
server.use(cors(config.corsOptions));
server.options('*', cors(config.corsOptions));

server.use(
  session({
    secret: config.sessionSecret,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    secure: false,
    httpOnly: true,
    name: "quilly-sessions",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 1000 * 60 * 60 * 24
    })
  })
);


server.get("/", (req, res) => {
  res.json({ api: "running" });
});

// use routers
server.use("/user", userRouter);

server.listen(config.port, () =>
  console.log(`API running on port ${config.port}`)
);
