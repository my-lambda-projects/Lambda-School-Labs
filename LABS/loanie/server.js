const path = require("path");
const dotenv = require('dotenv').config();
const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./loanie-api/routes/routes");
const port = process.env.PORT || 3030;
const server = express();

// let token = token;

// const corsOptions = {
//   origin: "*",
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };
server.use(express.static(path.resolve(__dirname, "./loanie-view/build")));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGOLAB_MAROON_URI)
  // .connect("mongodb://localhost:27017/loanie")
  .then(function(db) {
    console.log("All your dbs are belong to us!");
    server.listen(port, function() {
      console.log("server running on port " + port);
    });
  })
  .catch(function(err) {
    console.log("DB connection failed..", err.message);
  });

// server.use(cors());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Reads and set value in .env file
require("dotenv").config();

routes(server);

server.get("*", (request, response) => {
  response.sendFile(
    path.resolve(__dirname, "./loanie-view/build", "index.html")
  );
});

// server.listen(port, "0.0.0.0", () => {
//   console.log(`server listening on port ${port}`);
// });
