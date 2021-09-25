exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('posts')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('posts').insert([
				{
					project_id: 1,
					img_url: '',
					text: 'post text'
				},
				{
					project_id: 2,
					img_url: '',
					text: 'post text'
				},
				{
					project_id: 3,
					img_url: '',
					text: 'post text'
				},
				{
					project_id: 4,
					img_url: '',
					text: 'post text'
				}
			]);
		});
};
