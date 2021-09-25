const db = require('../config/dbConfig');
const Fuse = require('fuse.js');

module.exports = {
	getSearchResults,
	getProjectsByReviewer
};

let options = {
	shouldSort: true,
	includeScore: true,
	threshold: 0.3,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: ['project_name', 'text', 'username'] // need to have username in item array
};

function getSearchResults(query) {
	console.log('query: ' + query);
	let list = [];
	//need to create JOIN SQL query to get data from all tables
	return db('projects')
		.join('users', 'projects.user_id', 'users.user_id')
		.select(
			'projects.img_url',
			'projects.user_id',
			'projects.project_name',
			'users.username',
			'users.img_url as maker_photo_url',
			'projects.project_id',
			'projects.project_rating',
			'projects.text',
			'projects.last_updated'
		)
		.then(projects => {
			let fuse = new Fuse(projects, options); // "projects" is the item array
			let result = fuse.search(query);
			return result.map(item => item.item);
		})
		.catch(err => console.log(err));
}

function getProjectsByReviewer(username) {
	// need to get all projects that have been reviewed by a username
	//SQL statement that JOINS users, reviews, and projects table on users.username AND project_id

	return db('users')
		.where({ 'users.username': username })
		.join('reviews', 'reviews.user_id', 'users.user_id')
		.join('projects', 'projects.project_id', 'reviews.project_id')
		.join('users as makers', 'makers.user_id', 'projects.user_id')
		.select(
			'projects.project_id',
			'projects.project_name',
			'reviews.text',
			'projects.project_rating',
			'projects.img_url',
			'projects.user_id',
			'makers.username'
		);
}
