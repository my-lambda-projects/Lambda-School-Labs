const jwt = require('jsonwebtoken');

const { mysecret } = process.env;

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
};

const getUserRoles = async (req, res) => {
  const { isAdmin, isTeacher, isSuperAdmin } = req.decoded;
  return res.status(200).json({ isAdmin, isTeacher, isSuperAdmin });
};

module.exports = {
  authenticate,
  getUserRoles,
};
