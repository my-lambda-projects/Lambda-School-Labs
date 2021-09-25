const r = require('./responses');

/**
 * middleware that checks to see if a req.user is present
 *
 * req.user is automatically created when passport deserializes the session cookie
 */
exports.sid = (req, res, next) => {
	if (!req.user) {
		r.send(res, 422, { message: `session expired. please log in` });
		return;
	}

	next();
};

/**
 * middleware that checks password for user
 *
 * we can assume req.user is present (this middelware MUST be placed
 * BEFORE `authenticate.sid` middleware)
 */
exports.password = (req, res, next) => {
	console.log(req.body);
	req.user.comparePassword(req.body.user.password, (err, isMatch) => {
		if (err) {
			r.error(res, err, `error checking password`);
			return;
		}

		if (!isMatch) {
			r.send(res, 422, { message: `wrong password` });
			return;
		}

		next();
	});
};
