// main server file
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const corsOptions = {
  origin: "https://dont-email-us.netlify.com/",
  credentials: true
};

const authRouter = require("./api/routers/authRouter");
const letterRouter = require("./api/routers/letterRouter");
const paymentRouter = require("./api/routers/paymentRouter");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log(`\n====  connected to mongo ====\n`))
  .catch(() => console.log(`error connecting to mongo`));

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/", (req, res) => {
  res.send("Api running");
});
server.use("/auth", authRouter);
server.use("/letters", letterRouter);
server.use("/payment", paymentRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
