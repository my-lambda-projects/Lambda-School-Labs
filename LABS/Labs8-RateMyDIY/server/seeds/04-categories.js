exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('categories')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('categories').insert([
				{
					category_name: 'Cooking'
				},
				{
					category_name: 'Home Improvement'
				},
				{
					category_name: 'Tech'
				}
			]);
		});
};
