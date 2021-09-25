const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: function(user) {
    const jwtPayload = {
      subject: user.id,
      email: user.email
    };
    const jwtSecret = require("./secret.js").jwtSecret;
    const jwtOptions = {
      expiresIn: "7d"
    };
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
  },

  protectedRoute: function(req, res, next) {
    const token = req.headers.authorization;
    console.log("token 1", token)
    if (token) {
      jwt.verify(
        token,
        require("./secret.js").jwtSecret,
        (err, decodedToken) => {
          if (err) {
            res.status(401).json({ message: "invalid token" });
          } else {
            req.decodedToken = decodedToken;
            console.log("token 2", token)
            next();
          }
        }
      );
    } else {
      res.status(401).json({ message: "no token provided" });
    }
  }
};
