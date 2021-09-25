const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(
	'/signin'
);
const usersDB = require('../models/usersModel');
const authDB = require('../models/authModel');

// const authenticate = require('../config/authMiddleware');

router.get(
	'/signin',
	passport.authenticate('auth0', {
		scope: 'openid email profile'
	}),
	function(req, res) {
		res.redirect('/');
	}
);

router.get('/callback', function(req, res, next) {
	passport.authenticate('auth0', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/signin');
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			const returnTo = req.session.returnTo;
			delete req.session.returnTo;
			const sub = req.user.profile._json.sub;
			const auth_id = sub.split('|')[1];
			const username = req.user.profile._json.nickname;
			const img_url = req.user.profile._json.picture;
			const user = {
				auth_id,
				username,
				img_url
			};
			const role = req.user.profile._json['https://ratemydiy.herokuapp.com/roles'];
			if (role[0] === 'new') {
				usersDB
					.addUser(user)
					.then(dbRes => {
						console.log('DB SUCCESS');
						res.redirect(
							returnTo || process.env.FRONTEND_URL || `http://localhost:3000`
						);
					})
					.catch(dbErr => {
						console.log('DB ERROR');
						res.status(500).json({ error: 'Could not add user to database' });
					});
			} else {
				res.redirect(
					returnTo || process.env.FRONTEND_URL || `http://localhost:3000`
				);
			}
		});
	})(req, res, next);
});

router.get('/loggedIn', function(req, res, next) {
	// console.log('cookies:', req.cookies);
	// console.log('user:', req.user);

	if (req.user) {
		const auth_id = req.user.profile._json.sub.split('|')[1];
		console.log('User connected with auth_id', auth_id);

		authDB
			.loggedIn(auth_id)
			.then(userInfo => {
				res.status(200).json(userInfo);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	} else {
		res.status(200).json({});
	}
});

router.get('/signout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect(
		`https://ratemydiy.auth0.com/v2/logout?returnTo=${process.env
			.FRONTEND_URL ||
			`http://localhost:3000`}&client_id=ivcQqf9pMrudlWLh8zvTihsPN04bzBJs`
	);
});

router.post('/test', ensureLoggedIn, function(req, res, next) {
	console.log('cookies:', req.cookies);
	console.log('user:', req.user);

	//console.log(req.user);
	//console.log(req.user.app_metadata);
	res.status(200).json({ message: 'it works' });
});

router.get('/cookie', function(req, res, next) {
	console.log(req.cookies);
	res.status(200).json(req.cookies);
});

module.exports = router;
