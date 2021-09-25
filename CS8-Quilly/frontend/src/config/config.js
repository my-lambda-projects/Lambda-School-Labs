module.exports = {
  port: 3000,
  serverUrl: process.env.NODE_ENV === "production" ? "https://mighty-hollows-20066.herokuapp.com" : "http://localhost:5000",
  stripe: {
    publicKey: process.env.NODE_ENV === "production" ? "pk_test_K1tJV1QhjRPnqQFwDFxe6vZd" : "pk_test_K1tJV1QhjRPnqQFwDFxe6vZd",
  },	
};
