const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(
	'/signin'
);

const authorize = require('../config/authMiddleware');

const db = require('../models/postModel');

// add post to project by id
router.post('/', ensureLoggedIn, authorize, function(req, res, next) {
	const { user_id, project_id, img_url, text } = req.body;

	if (!img_url && !text) {
		return res.status(422).json({ error: 'Post cannot be empty.' });
	} else {
		const post = { img_url, text };
		db.addPost(user_id, project_id, post)
			.then(post_id => {
				if (post_id) {
					res.status(201).json(post_id);
				} else {
					// 404 if project doesn't exist ?
					// 403 if project exists but user is not author
					res.status(403).json({ error: 'Not authorized.' });
				}
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
});

// update post by id
router.put('/:post_id', ensureLoggedIn, authorize, function(req, res, next) {
	const { user_id, project_id, img_url, text } = req.body;
	const { post_id } = req.params;

	if (!img_url && !text) {
		return res.status(422).json({ error: 'Post cannot be empty.' });
	} else {
		const changes = { img_url, text };
		db.editPost(user_id, project_id, post_id, changes)
			.then(count => {
				if (count) {
					res.status(200).json(count);
				} else {
					// 404 if post doesn't exist ?
					// 403 if post exists but user is not author
					res.status(403).json({ error: 'Not authorized.' });
				}
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
});

// delete post by id
router.delete('/:post_id', ensureLoggedIn, authorize, function(req, res, next) {
	const { user_id, project_id } = req.body;
	const { post_id } = req.params;

	db.removePost(user_id, project_id, post_id)
		.then(count => {
			if (count) {
				res.status(200).json(count);
			} else {
				// 404 if post doesn't exist ?
				// 403 if post exists but user is not author
				res.status(403).json({ error: 'Not authorized.' });
			}
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
