const db = require('../config/dbConfig');

module.exports = {
	addUser,
	getUserProjects,
	getUserReviews,
	checkUsernames,
	editUsername,
	editProfilePic
};

function addUser(user) {
	console.log(user);
	return db('users')
		.insert(user)
		.into('users');
}

function getUserProjects(user_id) {
	return db('projects')
		.where({ user_id: user_id });
}

function getUserReviews(user_id) {
	return db('reviews')
		.where({ 'reviews.user_id': user_id })
		// .join('projects', 'projects.project_id', 'reviews.project_id')
		.join(`users as reviewers`, `reviewers.user_id`, `reviews.user_id`)
        .join(`projects`, `projects.project_id`, `reviews.project_id`)
		.select(
		'projects.img_url',
		'reviews.review_id',
		'reviews.project_id',
		'projects.project_name',
		'reviews.user_id as reviewer_id',
		'reviewers.username as reviewer_name',
		'projects.img_url',
		'reviews.rating',
		'reviews.text'
		)
				
}

function checkUsernames(username) {
	return db('users')
		.where({ username: username });
}

function editUsername(auth_id, username) {
	return db('users')
		.where({ auth_id: auth_id })
		.update({ username: username });
}

function editProfilePic(auth_id, img_url) {
	return db('users')
		.where({ auth_id: auth_id })
		.update({ img_url: img_url });
}
