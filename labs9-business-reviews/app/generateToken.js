const jwt = require('jsonwebtoken');

module.exports = id => {
  const jwtPayload = {
    id: id
  };
  const jwtSecret = 'secret-code';
  const jwtOptions = {
    expiresIn: '60m'
  };


  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};
