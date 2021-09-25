const router = require('express').Router();

/**
 * general helper functions for all api endpoints
 */
const sanitize = require('../../../helpers/sanitize');
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');

/**
 * /api/users/info
 * - GET: returns the user's info (sanitized, or without the hashed password)
 */
router
	.route('/')

	/**
	 * PUT /api/users/settings
	 *
	 * edits the user's non-sensitive info
	 *
	 * checks for a valid session id, then
	 * returns the user that is currently logged in to the session
	 *
	 * returns:
	 * {
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
	.get(authenticate.sid, (req, res) => {
		r.send(res, 200, sanitize.response(req.user));
	});

module.exports = router;
