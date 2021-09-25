const router = require('express').Router();

const { debug } = require('../../../../dev');

/**
 * /api/pictures
 * - GET: used for debug only
 */
router
	.route('/')

	/**
	 * used for debug only
	 */
	.get((req, res) => {
		debug ? res.send({ pictures: `running` }) : null;
	});

module.exports = router;
