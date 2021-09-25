const router = require('express').Router();

const { debug } = require('./dev');

/**
 * api endpoints
 */
router.use('/users', require('./api/endpoints/user'));
router.use('/pictures', require('./api/endpoints/picture'));
// add more api endpoints here

router.route('/').get((req, res) => {
	debug ? res.send({ api: 'running' }) : null;
});

module.exports = router;
