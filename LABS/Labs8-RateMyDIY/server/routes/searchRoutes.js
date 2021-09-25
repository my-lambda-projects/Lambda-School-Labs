const express = require('express');
const router = express.Router();

const db = require('../models/searchModel');

//Search API endpoint
router.get('/', (req, res) => {
	//get search query from URL
	const query = req.query.query;
	const username = req.query.username;
	console.log(username);

	//check if query exists
	if (!query && !username) {
		res.status(400).json({ message: 'Bad request' });
	} else if (query) {
		db.getSearchResults(query)
			.then(results => {
				console.log(results);
				res.status(200).json(results);
			})
			.catch(err => res.status(500).json(err));
	}

	if (username) {
		db.getProjectsByReviewer(username)
			.then(results => {
				console.log(results);
				res.status(200).json(results);
			})
			.catch(err => res.status(500).json(err));
	}
});

module.exports = router;
