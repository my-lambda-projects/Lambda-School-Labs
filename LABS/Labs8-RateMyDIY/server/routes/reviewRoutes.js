const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const authorize = require('../config/authMiddleware');

const db = require('../models/reviewModel');

// get review by id
router.get('/:review_id/:user_id', function(req, res, next) {
	const { review_id, user_id } = req.params;

	db.getReview(review_id, user_id)
		.then(review => {
			if (review) {
				res.status(200).json(review);
			} else {
				res.status(404).json({ error: 'Review not found.' });
			}
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// get review id by project_id and user_id
router.get('/getid/:user_id/:project_id', function(req, res, next) {
	const { project_id, user_id } = req.params;
	console.log(
		`reviewRoutes: getReviewId(project_id: ${project_id}, user_id: ${user_id})`
	);

	db.getReviewID(project_id, user_id)
		.then(review_id => {
			console.log(`Returned review_id ${review_id})`);
			res.status(200).json(review_id);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// add review
router.post('/', ensureLoggedIn, authorize, function(req, res, next) {
	const { user_id, project_id, rating, text } = req.body;

	// Convert rating to integer
	ratingInt = parseInt(rating);

	if (!rating || !text) {
		res.status(422).json({ error: 'Missing parameters.' });
	} else if (!Number.isInteger(ratingInt) || ratingInt < 1 || 5 < ratingInt) {
		res.status(403).json({ error: 'Nice try.' });
	} else {
		const review = { user_id, project_id, rating: ratingInt, text };
		console.log(
			`\nUser ${user_id} attempting to add a review to project ${project_id} with rating = ${rating}, text = "${text}"\n...`
		);
		db.addReview(review)
			.then(({ review_id, ownProject, alreadyReviewed, projectNotFound }) => {
				if (ownProject) {
					res.status(403).json({ error: `You can't review your own project.` });
					console.log(
						`Rejected with error: "You can't review your own project.\n`
					);
				} else if (alreadyReviewed) {
					res
						.status(403)
						.json({ error: `You've already reviewed this project.` });
					console.log(
						`Rejected with error: "You've already reviewed this project.\n`
					);
				} else if (projectNotFound) {
					res.status(404).json({ error: `Project not found.` });
					console.log(`Rejected with error: "Project not found.\n`);
				} else if (review_id) {
					res.status(201).json(review_id);
				} else {
					res.status(500).json({ error: `Failed to add review` });
				}
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
});

// // update review by id
router.put('/:review_id', ensureLoggedIn, authorize, function(req, res, next) {
	const { user_id, rating, project_id, text } = req.body;
	const { review_id } = req.params;

	// Convert rating to integer
	ratingInt = parseInt(rating);

	if (!rating || !text) {
		res.status(422).json({ error: 'Missing parameters.' });
	} else if (!Number.isInteger(ratingInt) || ratingInt < 1 || 5 < ratingInt) {
		res.status(403).json({ error: 'Nice try.' });
	} else {
		db.editReview({ user_id, review_id, project_id, rating: ratingInt, text })
			.then(({ review_id, reviewNotFound }) => {
				if (reviewNotFound) {
					res.status(404).json({ error: 'Review not found.' });
				} else if (review_id) {
					res.status(200).json(review_id);
				} else {
					res.status(500).json({ error: `Failed to update review` });
				}
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
});

// delete review by id
router.delete('/:review_id', ensureLoggedIn, authorize, function(
	req,
	res,
	next
) {
	const { user_id } = req.body;
	const { review_id } = req.params;

	db.removeReview(user_id, review_id)
		.then(({ deleted, reviewNotFound }) => {
			if (reviewNotFound) {
				res.status(404).json({ error: 'Review not found.' });
			} else if (deleted) {
				res.status(200).json(deleted);
			} else {
				res.status(500).json({ error: `Failed to delete review` });
			}
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// like review by id
router.put('/:review_id/like', ensureLoggedIn, authorize, function(
	req,
	res,
	next
) {
	const { user_id, like } = req.body;
	const { review_id } = req.params;

	db.likeReview({ user_id, review_id, like })
		.then(({ liked, reviewNotFound, ownReview }) => {
			if (reviewNotFound) {
				res.status(404).json({ error: 'Review not found.' });
			} else if (ownReview) {
				res.status(403).json({ error: `You can't like your own review.` });
			} else if (liked) {
				res.status(200).json(liked.like);
			} else {
				res.status(500).json({ error: `Failed to update like value` });
			}
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
