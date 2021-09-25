// Directs all incoming API requests to the appropriate routers
const users = require("./routes/users");
const paymentApi = require("./routes/payment");

module.exports = server => {
  server.use("/users", users); // Add additional endpoint files here
  server.use("/payment", paymentApi);
};
