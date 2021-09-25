const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(
	'/signin'
);
const authDB = require('../models/authModel');
const usersDB = require('../models/usersModel');
const axios = require('axios');

const authenticate = require('../config/authMiddleware');

router.get('/user', function(req, res, next) {
	res.status(200).json(req.cookies);
});

router.post('/myprojects', authenticate, function(req, res, next) {
	const { user_id } = req.body;
	usersDB
		.getUserProjects(user_id)
		.then(projectsList => {
			console.log('projectsList', projectsList);
			res.status(200).json(projectsList);
		})
		.catch(projectsError => {
			console.log('projectsError', projectsError);
			res.status(400).json(projectsError);
		});
});

router.post('/myreviews', function(req, res, next) {
	const { user_id } = req.body;
	usersDB
		.getUserReviews(user_id)
		.then(reviewsList => {
			console.log('reviewsList', reviewsList);
			res.status(200).json(reviewsList);
		})
		.catch(reviewsError => {
			console.log('reviewsError', reviewsError);
			res.status(400).json(reviewsError);
		});
});

router.post('/editusername', function(req, res, next) {
	const sub = req.user.profile._json.sub;
	const auth_id = sub.split('|')[1];
	const { username } = req.body;
	// const img_url = req.user.profile._json.picture;
	axios
		.post(
			'https://ratemydiy.auth0.com/oauth/token',
			JSON.stringify({
				client_id: process.env.M2M_CLIENT_ID,
				client_secret: process.env.M2M_CLIENT_SECRET,
				audience: 'https://ratemydiy.auth0.com/api/v2/',
				grant_type: 'client_credentials'
			}),
			{
				headers: {
					'content-type': 'application/json'
				}
			}
		)
		.then(tokenFetch => {
			console.log('tokenFetch', tokenFetch);
			const token = tokenFetch.data.access_token;
			axios
				.patch(
					`https://ratemydiy.auth0.com/api/v2/users/${sub}`,
					{ username: username },
					{
						headers: {
							authorization: 'Bearer ' + token
						}
					}
				)
				.then(changeSuccess => {
					console.log('USERNAME CHANGED', changeSuccess);
					// res.status(200).json(changeSuccess.data);
					const editedUsername = changeSuccess.data.username;
					usersDB
						.checkUsernames(editedUsername)
						.then(usernameList => {
							console.log('usernameList', usernameList);
							if (usernameList.length === 0) {
								usersDB
									.editUsername(auth_id, username)
									.then(editSuccess => {
										console.log('EDIT SUCCESS', editSuccess);
										res.status(200).json({ message: editedUsername });
									})
									.catch(editError => {
										console.log('EDIT ERROR', editError);
										res
											.status(500)
											.json({ message: 'Please choose a different username' });
									});
							} else {
								res
									.status(500)
									.json({ message: 'Please choose a different username' });
							}
						})
						.catch(usernameListError => {
							console.log('usernameListError', usernameListError);
							res
								.status(500)
								.json({ message: 'Please choose a different username' });
						});
				})
				.catch(changeError => {
					console.log('USERNAME ERROR', changeError.response.data);
					res.status(200).json(changeError.response.data);
				});
		})
		.catch(tokenError => {
			console.log('tokenError', tokenError.response.data);
			res.status(200).json(tokenError.response.data);
		});
});

router.post('/editprofilepic', function(req, res, next) {
	const sub = req.user.profile._json.sub;
	const auth_id = sub.split('|')[1];
	const { img_url } = req.body;
	usersDB
		.editProfilePic(auth_id, img_url)
		.then(picSuccess => {
			console.log('PIC SUCCESS', picSuccess);
			res.status(200).json({ message: 'Profile picture changed' });
		})
		.catch(picError => {
			console.log('PIC ERROR', picError);
			res.status(500).json({ message: 'Error changing profile picture' });
		});
});

module.exports = router;
