const router = require('express').Router();

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const validate = require('../../../helpers/validate/index');
const sanitize = require('../../../helpers/sanitize');
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');

/**
 * /api/users/settings
 * - PUT: edits the user's sensitive info
 */
router
	.route('/')

	/**
	 * PUT /api/users/settings
	 *
	 * edits the user's non-sensitive info
	 *
	 * checks for a valid session id, then
	 * checks that there is an email and/or password (new) in the body, then
	 * sanitizes the new settings data, before
	 * updating the user settings
	 *
	 * expects:
	 * {
	 *    user:
	 *    {
	 *       email: 'my_edited@email.com',
	 *       passwords: 'myUnhashedPassword'
	 *    }
	 * }
	 *
	 * returns:
	 * {
	 *    email: 'my_edited@email.com',
	 *    firstName: 'mary',
	 *    lastName: 'jane',
	 *    balance: 0,
	 *    nickNames: ['Mary', 'MJ'],
	 *    photos: [],
	 *    uploads: []
	 * }
	 */
	.put(
		authenticate.sid,
		validate.settingsData,
		sanitize.settingsData,
		userCTR.requestById,
		userCTR.save,
		(req, res) => {
			r.send(res, 200, sanitize.response(savedUser));
		},
	);

module.exports = router;
