const paymentApi = require('./payments');

const configureRoutes = server => {
  paymentApi(server);
};

module.exports = configureRoutes;
