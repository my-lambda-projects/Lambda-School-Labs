const router = require('express').Router();

/**
 * controller that interacts with Stripe api
 */
const stripeCTR = require('../../stripe');

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');
const sanitize = require('../../../helpers/sanitize');

/**
 * /api/users/payment
 * - POST: creates a charge to customer via Stripe
 */
router
	.route('/')

	/**
	 * POST /api/users/paymenet
	 *
	 * creates a charge to customer via Stripe
	 *
	 * checks for valid session cookie (user), then
	 * charges via Stripe APi, and if successful,
	 * adds credits to user
	 *
	 * returns:
	 * {
	 *    captured: true,
	 *    user: { ... }
	 * }
	 */
	.post(authenticate.sid, stripeCTR.process, userCTR.update, (req, res) => {
		r.send(res, 200, {
			captured: req.captured,
			user: sanitize.response(req.updatedUser),
		});
	});

module.exports = router;
