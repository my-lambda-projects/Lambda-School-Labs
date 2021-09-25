const db = require('../config/dbConfig');
var Promise = require('bluebird');

module.exports = {
	getProject,
	getReviewsByProjectID,
	addProject,
	editProject,
	removeProject
};

function getProject(project_id) {
	return db('projects')
		.where({ project_id })
		.join('users', 'users.user_id', 'projects.user_id')
		.select(
			'projects.project_id',
			'projects.project_name',
			'projects.project_rating',
			'projects.img_url',
			'projects.text',
			'users.user_id',
			'users.username',
			'users.img_url as user_img'
		)
		.first()
		.then(project => {
			if (project) {
				return (
					db('project_categories')
						.where({ project_id })
						.join(
							'categories',
							'categories.category_id',
							'project_categories.category_id'
						)
						// strip project_id
						.select('categories.category_id', 'categories.category_name')
						.then(categories => {
							return (
								db('posts')
									.where({ project_id })
									// strip project_id
									.select('post_id', 'img_url', 'text')

									// .then(
									// 	posts => {
									// 		return db('reviews')
									// 			.where({ project_id })
									// 			.select(
									// 				'review_id',
									// 				'user_id',
									// 				'rating',
									// 				'img_url',
									// 				'text',
									// 				'likes',
									// 				'dislikes',
									// 				'helpfulness'
									// 			)
									// 			.then(reviews => ({
									// 				...projectWithCategories,
									// 				posts,
									// 				reviews
									// 			}));
									// 	})
									.then(posts => ({ ...project, categories, posts }))
							);
						})
				);
			} else return undefined;
		})
		.catch(error => console.log(`getProject Error:`, error));
}

function getReviewsByProjectID(project_id, user_id) {
	return db('reviews')
		.where({ 'reviews.project_id': project_id })
		.join('users as reviewers', 'reviewers.user_id', 'reviews.user_id')
		.join('projects', 'projects.project_id', 'reviews.project_id')
		.join('users as makers', 'makers.user_id', 'projects.user_id')
		.select(
			'reviews.review_id',
			'makers.user_id as maker_id',
			'makers.username as maker_name',
			'makers.img_url as maker_img',
			'reviews.project_id',
			'projects.project_name',
			'reviews.user_id as reviewer_id',
			'reviewers.username as reviewer_name',
			'reviewers.img_url as reviewer_img',
			'projects.img_url',
			'reviews.rating',
			'reviews.text',
			'reviews.helpfulness'
		)
		.then(reviews => {
			// Is the user logged in?
			if (user_id !== '0') {
				// I couldn't figure out how to get a join working...
				// This is probably very inefficient

				// Make an array of just the review_ids + the user's user_id
				const reviewIdArray = reviews.map(({ review_id }) => [
					user_id,
					review_id
				]);

				// Return an array of reviews liked or disliked by the user
				return db('likes')
					.whereIn(['user_id', 'review_id'], reviewIdArray)
					.select('review_id', 'like')

					.then(likes => {
						// Merge the two arrays
						const reviewsWithLikes = reviews.map(review => ({
							...likes.find(like => review.review_id === like.review_id),
							...review
						}));

						return reviewsWithLikes;
					});
			} else {
				return reviews;
			}
		})
		.catch(error => console.log(`getReviewsByProjectID error:`, error));

	// If you know how to make this work with a join, let me know

	// if (user_id) {
	// 	return db('reviews')
	// 		.where({ 'reviews.project_id': project_id, 'likes.user_id': user_id  })
	// 		.join('users as reviewers', 'reviewers.user_id', 'reviews.user_id')
	// 		.join('projects', 'projects.project_id', 'reviews.project_id')
	// 		.join('users as makers', 'makers.user_id', 'projects.user_id')
	// 		.join('likes', 'likes.review_id', 'reviews.review_id')

	// 		.select(
	// 			'reviews.review_id',
	// 			'makers.user_id as maker_id',
	// 			'makers.username as maker_name',
	// 			'makers.img_url as maker_img',
	// 			'reviews.project_id',
	// 			'projects.project_name',
	// 			'reviews.user_id as reviewer_id',
	// 			'reviewers.username as reviewer_name',
	// 			'reviewers.img_url as reviewer_img',
	// 			'projects.img_url',
	// 			'reviews.rating',
	// 			'reviews.text',
	// 			'likes.like'
	// 		)
	// 		.catch(error => console.log(`getReviewsByProjectID error:`, error));
}

// I'm not satisfied with this solution because it's not atomic. It can add a project but fail to add its categories.
function addProject({ categories, ...project }) {
	return db('projects')
		.insert(project, 'project_id')
		.then(([project_id]) => {
			if (project_id && categories.length) {
				return db
					.transaction(trx => {
						return Promise.map(categories, category_id => {
							const project_category = { project_id, category_id };
							console.log('addProject: project_category', project_category);

							return trx('project_categories').insert(project_category);
						});
					})
					.then(inserts => {
						console.log(
							`${inserts.length} categories added for project ${project_id}`
						);
						return { project_id };
					})
					.catch(error => {
						console.error(error);
						return { project_id, failedToAddCategories: true };
					});
			} else return { project_id };
		});
}

// This works with postgres but it doesn't return a project_id to update the reviewModal
// function addProject(project, categories) {
// 	return db
// 		.transaction(trx => {
// 			return trx
// 				.insert(project, 'project_id')
// 				.into('projects')
// 				.then(([project_id]) => {
// 					console.log('addProject: project_id', project_id);
// 					if ((project_id, categories.length))
// 						return Promise.map(categories, category_id => {
// 							const project_category = { project_id, category_id };
// 							console.log('addProject: project_category', project_category);

// 							return trx.insert(project_category).into('project_categories');
// 						});
// 				});
// 		})
// 		.then(inserts => {
// 			console.log(inserts.length + ' categories added for project');
// 			// return project_id;
// 		})
// 		.catch(error => {
// 			console.error(error);
// 		});
// }

function editProject(user_id, project_id, { categories, ...changes }) {
	// Update the project table
	return db('projects')
		.where({ user_id, project_id })
		.update(changes, 'project_id')
		.then(ids => {
			const count = ids.length;
			if (!count || (count && !categories.length)) {
				// No project by that id or no categories associated with that project
				return { count };
			} else {
				// Return the old categories
				return db('project_categories')
					.where({ project_id })
					.select('category_id')
					.then(project_categories => {
						// Let's make that an array
						const previous_categories = project_categories.map(
							({ category_id }) => category_id
						);
						// Any new categories to add?
						const toAdd = categories.filter(
							category => !previous_categories.includes(category)
						);
						// Any old categories to remove?
						const toRemove = previous_categories.filter(
							category => !categories.includes(category)
						);
						if (toAdd.length || toRemove.length) {
							// Update project_categories table
							return db
								.transaction(trx => {
									return Promise.map(
										toAdd.concat(toRemove),
										(category_id, index) => {
											const project_category = { project_id, category_id };
											if (index < toAdd.length) {
												console.log(
													'Adding project_category',
													project_category
												);
												return trx('project_categories').insert(
													project_category
												);
											} else {
												console.log(
													'Removing project_category',
													project_category
												);
												return trx('project_categories')
													.where(project_category)
													.del();
											}
										}
									);
								})
								.then(categories_modified => {
									// Return the number of categories changed
									return categories_modified.length;
								});
						} else {
							return 0;
						}
					})
					.then(category_count => {
						console.log(
							`${category_count} categories modified for project ${project_id}`
						);
						return { count };
					})
					.catch(error => {
						console.error(error);
						return { count, failedToUpdateCategories: true };
					});
			}
		});
}

function removeProject(user_id, project_id) {
	return db('projects')
		.where({ user_id, project_id })
		.del();
}
