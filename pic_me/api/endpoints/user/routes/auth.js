const router = require('express').Router();

/**
 * passport with strategies and settings
 */
const passport = require('../../../auth/passport');

/**
 * /api/users/auth/twitter
 * - GET: starts a Twitter oAuth request
 */
router
	.route('/twitter')

	/**
	 * GET /api/users/auth/twitter
	 *
	 * starts a Twitter oAuth request
	 */
	.get(passport.authenticate('twitter'));

/**
 * /api/users/auth/twitter/callback
 * - GET: handles Twitter callback uri
 */
router
	.route('/twitter/callback')
	/**
	 * GET /api/users/auth/twitter/callback
	 *
	 * handles Twitter callback uri
	 */
	.get(
		passport.authenticate('twitter', { failureRedirect: '/login' }),
		(req, res) => {
			res.redirect('/feature');
		},
	);

module.exports = router;
