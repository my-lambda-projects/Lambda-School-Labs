const router = require('express').Router();

/**
 * passport with strategies and settings
 */
const passport = require('../../../auth/passport');

/**
 * general helper functions for all api endpoints
 */
const validate = require('../../../helpers/validate/index');
const sanitize = require('../../../helpers/sanitize');
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');

/**
 * /api/users/login
 * - POST: logs a user in to the session
 */
router
	.route('/')

	/**
	 * POST /api/users/login
	 *
	 * logs a user in to the session
	 *
	 * checks for valid login credentials, then
	 * checks login via passport, and
	 * returns a message
	 *
	 * returns:
	 * {
	 *    message: 'successfully logged in',
	 *    user: { ... }
	 * }
	 *
	 * if login fails:
	 * 401 Unauthorized
	 */
	.post(validate.login, passport.authenticate('local'), (req, res) => {
		r.send(res, 200, { user: req.user, message: `successfully logged in` });
	});

/**
 * /api/users/login/check
 * - POST: checks to see if a user is logged in to the session
 */
router
	.route('/check')
	/**
	 * POST /api/users/login/check
	 *
	 * checks to see if a user is logged in to the session via session cookie, and
	 * returns a message and the sanitized user info
	 *
	 * returns:
	 * {
	 *    message: 'user verified',
	 *    user:
	 *    {
	 *       email: 'my_edited@email.com',
	 *       firstName: 'mary',
	 *       lastName: 'jane',
	 *       balance: 0,
	 *       nickNames: ['Mary', 'MJ'],
	 *       photos: [],
	 *       uploads: []
	 *    }
	 * }
	 */
	.post(authenticate.sid, (req, res) => {
		r.send(res, 200, {
			message: `user verified`,
			user: sanitize.response(req.user),
		});
	});

module.exports = router;
