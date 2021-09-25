const router = require('express').Router();

const { debug } = require('../../../../dev');

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
 * /api/users
 * - GET:    used for debug only
 * - POST:   creates a new user
 * - PUT:    edits the user's non-sensitive info
 * - DELETE: deletes the user
 */
router
	.route('/')

	/**
	 * used for debug only
	 */
	.get((req, res) => {
		debug ? response.send(res, 200, { users: `running` }) : null;
	})

	/**
	 * POST /api/users
	 *
	 * creates a new user
	 *
	 * checks the new user's signup info, then
	 * sanitizes new user's info, then
	 * saves new user to the database
	 *
	 * expects:
	 * {
	 *    email: 'my@email.com',
	 *    password: 'unhashedPassword',
	 *    firstName: 'John',
	 *    lastName: 'Doe'
	 * }
	 *
	 * returns:
	 * {
	 *    email: 'my@email.com',
	 *    firstName: 'john',
	 *    lastName: 'doe',
	 *    balance: 0,
	 *    nickNames: ['John'],
	 *    photos: [],
	 *    uploads: []
	 * }
	 */
	.post(validate.signup, sanitize.user, userCTR.create, (req, res) => {
		r.send(res, 201, sanitize.response(req.savedUser));
	})

	/**
	 * PUT /api/users
	 *
	 * edits the user's non-sensitive info
	 *
	 * checks for a valid session id, then
	 * checks the update info for at least one editable field (see below), and
	 * sanitizes updated info, then
	 * updates the user info on the database
	 *
	 * env config:
	 * EDITABLE_FIELDS=["firstName","lastName","nickNames"]
	 *
	 * expects:
	 * {
	 *    user:
	 *    {
	 *       firstName: 'Josh',
	 *       lastName: 'Moe',
	 *       nickNames: ['Josh', 'MoScho']
	 *    }
	 * }
	 *
	 * returns:
	 * user:
	 * {
	 *    email: 'my@email.com',
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
		validate.update,
		sanitize.update,
		userCTR.update,
		(req, res) => {
			r.send(res, 200, sanitize.response(req.updatedUser));
		},
	)

	/**
	 * DELETE /api/users
	 *
	 * deletes the user
	 *
	 * checks for a valid session id, then
	 * deletes the user info on the database, and
	 * logs the user out of the session, and
	 * redirect to logout page
	 *
	 */
	.delete(authenticate.sid, userCTR.delete, (req, res) => {
		req.logout();

		r.send(res, 200, { message: `user successfully deleted` });
	});

module.exports = router;
