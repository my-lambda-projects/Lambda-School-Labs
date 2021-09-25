const router = require('express').Router();
const Population = require('./pop-model');
// const restricted = require('../auth/auth-middleware');

router.get('/', (req, res) => {
	Population.find()
		.then((total) => {
			res.status(200).json(total);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});


module.exports = router;