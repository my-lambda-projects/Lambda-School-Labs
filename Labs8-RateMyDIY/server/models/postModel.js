const db = require('../config/dbConfig');

module.exports = {
	addPost,
	editPost,
	removePost
};

function addPost(user_id, project_id, post) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(project => {
			if (project) {
				return db('posts')
					.returning('post_id')
					.insert({ ...post, project_id })
					.then(([id]) => {
						if (id) {
							return db('projects')
								.where({ project_id })
								.update({ last_updated: db.fn.now() })
								.then(() => id);
						}
					});
			} else return undefined; // no project by that id || wrong author
		});
}

// I feel like this could be more elegant.
function editPost(user_id, project_id, post_id, changes) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(post => {
			if (post) {
				return db('posts')
					.where({ project_id, post_id })
					.returning('post_id')
					.update(changes)
					.then(ids => ids.length)
					.then(count => {
						if (count) {
							return db('projects')
								.where({ project_id })
								.returning('project_id')
								.update({ last_updated: db.fn.now() })
								.then(ids => ids.length);
						} else return undefined; // no post by that id
					});
			} else return undefined; // no project by that id || wrong author
		});
}

function removePost(user_id, project_id, post_id) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(project => {
			if (project) {
				return db('posts')
					.where({ project_id, post_id })
					.del();
			} else return undefined; // no post by that id || wrong author
		});
}
