const express = require("express");
const routes = require("./routes/routes.js");
const server = express();
require("dotenv").config();

server.use(require("body-parser").text());
server.use(express.json());

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 7000;
}

server.get("/", (req, res) => {
  res.send("NICE. The api is up and running.");
});

server.use("/", routes);


server.listen(PORT, () => {
    console.log(
     `== backend server is running on ${PORT} ==\n== using the ${process.env.DB} database ==\n== and the ${process.env.ENV} enviornment ==`
    );
});
