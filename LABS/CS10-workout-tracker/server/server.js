const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();
const cors = require("cors");
const routes = require("./api/routes");

app.use(cors());
app.use(express.json());
routes(app);

app.get("/", (req, res) => {
  res.json({ message: "Connected to server!" });
});

mongoose.connect(
  `mongodb://${process.env.USERNAME}:${
    process.env.PASSWORD
  }@ds251622.mlab.com:51622/workout_tracker`,
  { useNewUrlParser: true },
  () => {
    console.log("connected to mongo");
  }
);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
