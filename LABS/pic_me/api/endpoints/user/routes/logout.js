const router = require('express').Router();

/**
 * general helper functions for all api endpoints
 */
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');

/**
 * /api/users/logout
 * - GET: logs a user out of the session
 */
router
	.route('/')

	/**
	 * GET /api/users/logout
	 *
	 * logs a user out of the session
	 *
	 * checks for valid login credentials, then
	 * logs user out
	 *
	 * returns:
	 * {
	 *    message: 'successfully logged out'
	 * }
	 *
	 * if login fails:
	 * 401 Unauthorized
	 */
	.get(authenticate.sid, (req, res) => {
		req.logout();
		r.send(res, 200, { message: `successfully logged out` });
	});

module.exports = router;
