// express-async-errors module expects a middleware function with 4 params, including err
// every uncaught endpoint request will pass through this middleware
// specifically, the absence of try/catch blocks will mean any errors are uncaught and be handled by this function
module.exports = (err, req, res, next) => {
  // if no status code found, assume error (500 range)
  const statusCode = err.statusCode || 500;
  const env = process.env.DB_ENV || "development";
  let error;
  if (env === "development" && statusCode >= 500) {
    // if in development, show details regarding err such as origin, attempted method, and message
    console.error(err);
    error = `Error during ${req.method} at ${req.path}: ${err.message}`;
  }
  if (env === "production" && statusCode >= 500) {
    // if in production, don't broadcast details of API structure and just send generic message
    error = "An error occurred while processing your request.";
  }
  res.status(statusCode).json({ error });
};
