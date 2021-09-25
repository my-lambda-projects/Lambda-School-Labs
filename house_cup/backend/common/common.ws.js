const jwt = require('jsonwebtoken');

const { mysecret } = process.env;

const authenticate = (packet, next) => {
  const token = packet[1].Authorization;
  if (token) {
    jwt.verify(token, mysecret, (error, decoded) => {
      if (!error) {
        packet.decoded = decoded;
        next();
      } else {
        next(new Error('Unauthorized: Invalid Token'));
      }
    });
  } else {
    next(new Error('Unauthorized: Authorization token not present'));
  }
};

module.exports = {
  authenticate,
};
