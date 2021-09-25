
const db = require('../config/dbConfig');

function getProjectsCategory(category_name) {
	return db('categories')
	.where({category_name})
  .join('project_categories','project_categories.category_id','categories.category_id')
		.join('projects', 'projects.project_id', 'project_categories.project_id')
		.join('users', 'users.user_id', 'projects.user_id')
  .select(
	'projects.project_id',
	'projects.project_name',
	'projects.project_rating',
	'projects.img_url',
	'projects.user_id',
	'users.username',
	'categories.category_id'
  );
}

  module.exports = {getProjectsCategory}