const knex = require('knex');
const db = require('../config/dbConfig');

module.exports = {
	getPopularProjects,
	getPopularMakers,
	getPopularReviewers
};

function getPopularProjects() {
	return (
		db('projects')
			.join('users', 'projects.user_id', 'users.user_id')
			.select(
				'projects.img_url',
				'projects.user_id',
				'projects.project_name',
				'users.username',
				'users.img_url as maker_photo_url',
				'projects.project_id',
				'projects.project_rating',
				'projects.text'
			)
			// For Azure
			// .orderBy('project_rating', 'desc')
			// For Heroku
			.orderByRaw('project_rating DESC NULLS LAST')
			.limit(6)
	);
}

// SELECT u.user_id, count(p.user_id) as projects
// from users as u
// left join projects as p on u.user_id=p.user_id
// group by u.user_id
// order by 1

function getPopularMakers() {
	const userFields = 'u.user_id, u.username, u.img_url, u.user_rating';

	return (
		db('users as u')
			.leftJoin('projects as p', 'u.user_id', 'p.user_id')
			.select(knex.raw(`${userFields}, count(p.user_id) as project_count`))
			.groupByRaw(userFields)
			// For Azure
			// .orderBy('user_rating', 'desc')
			// For Heroku
			.orderByRaw('user_rating DESC NULLS LAST')
			.limit(6)
	);
}

function getPopularReviewers() {
	const userFields = 'u.user_id, u.username, u.img_url, u.helpfulness';

	return (
		db('users as u')
			.leftJoin('reviews as r', 'u.user_id', 'r.user_id')
			.select(knex.raw(`${userFields}, count(r.user_id) as review_count`))
			.groupByRaw(userFields)
			// For Azure
			// .orderBy('helpfulness', 'desc')
			// For Heroku
			.orderByRaw('helpfulness DESC NULLS LAST')
			.limit(6)
	);
}
