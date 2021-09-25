const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message
  });
};

const sendErrorProd = (err, res) => {
  // OPERATIONAL TRUSTED -> SEND MESSAGE
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
    // PROGRAMMING ERROR OR OTHER UNKNOWN ERROR
  } else {
    console.error("ERROR", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong in the server"
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "production") {
    return sendErrorProd(err, res);
  } else {
    return sendErrorDev(err, res);
  }
};