module.exports = {
  errorHandler: (err, req, res, next) => {
    switch (err.code) {
      case 400:
        res.status(400).json({
          status: false,
          error_code: 'bad_request',
          msg: 'heander or parameteres in the request are missing',
        });
        break;
      case 500:
        res.status(500).json({
          status: false,
          error_code: 'server_side_error',
          msg: 'something went wrong',
        });
        break;
      case 404:
        res.status(404).json({
          status: false,
          error_code: 'unable_to_process',
          msg: 'cannot be found',
        });
        break;
      case 403:
        res.status(403).json({
          status: false,
          error_code: 'forbidden',
          msg: 'your authorization header is invalid.',
        });
        break;
      default:
        res.status(err.code || 500).json({
          status: false,
          message: err.message || 'Something went wrong',
        });
    }
  },
};
