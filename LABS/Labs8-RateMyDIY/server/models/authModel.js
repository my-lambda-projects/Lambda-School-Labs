const db = require('../config/dbConfig');

module.exports = {
	getAuthID,
	loggedIn
};

function getAuthID(user_id) {
	return db('users')
		.where({ user_id })
		.first()
		.then(user => {
			if (user) {
				return user.auth_id;
			} else return undefined;
		});
}

function loggedIn(auth_id) {
	return (
		db('users')
			.where({ auth_id })
			.first()
			// .select('user_id', 'username', 'img_url', 'user_rating', 'rating_sum', 'rating_count', 'helpfulness')
			.then(userInfo => userInfo || {})
	);
}
