require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtKey = "whatever" || process.env.secret;

module.exports = {
	authenticate,
	generateToken
};

function authenticate(req, res, next) {
	const token = req.get('Authorization');
	if (token) {
		jwt.verify(token, jwtKey, (err, decoded) => {
			if (err) return res.status(401).json(err);
			req.decoded = decoded;
			next();
		});
	} else {
		return res.status(401).json({
			error: 'No token provided, must be set on the Authorization Header'
		});
	}
}

function generateToken(user, type) {
	console.log("token user", user)
	const payload = {
		id: user.id,
		password: user.password,
		isLandlord: type
		
  };

	const options = {
		expiresIn: '600m'
  }

	return jwt.sign(payload, jwtKey, options);
}
