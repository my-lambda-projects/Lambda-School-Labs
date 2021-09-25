const router = require('express').Router();

const { dev } = require('../../../../dev');

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');

/**
 * /api/users/all
 * - GET: dev route for seeing all users
 */
router
	.route('/')

	/**
	 * GET /api/users/all
	 *
	 * dev route for seeing all users
	 *
	 * returns:
	 * [
	 *    { user1 },
	 *    { user2 },
	 *    { etc   }
	 * ]
	 */
	.get(authenticate.sid, userCTR.retrieve, (req, res) => {
		dev ? r.send(res, 200, req.foundUsers) : null;
	});

module.exports = router;
