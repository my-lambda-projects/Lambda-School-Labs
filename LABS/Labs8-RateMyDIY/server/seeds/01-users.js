exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users').insert([
				{
					auth_id: 1,
					username: 'alejandrok',
					user_rating: 4.3,
					rating_sum: 24,
					rating_count: 6,
					helpfulness: 16
				},
				{
					auth_id: 2,
					username: 'tristen',
					user_rating: 4.7,
					rating_sum: 15,
					rating_count: 3,
					helpfulness: 10
				},
				{
					auth_id: 3,
					username: 'david',
					user_rating: 3.9,
					rating_sum: 31,
					rating_count: 8,
					helpfulness: 21
				},
				{
					auth_id: '5c10700bb0bac32fa55a7d56',
					username: 'seeduser',
					user_rating: 4.0,
					rating_sum: 29,
					rating_count: 7,
					helpfulness: 19
				}
			]);
		});
};
