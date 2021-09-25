exports.seed = function(knex, promise) {
	return knex('properties').del().then(function() {
		return knex('properties').insert([
			{
				id: 1,
				name: 'Incubators Galore',
				address: '123 Fake Ave',
				city: 'San Francisco',
				state: 'CA',
				zip: '94016',
				owner: 1,
				sqft: 2200,
				bathrooms: 2,
				rooms: 3,
				year: 1975
			},
			{
				id: 2,
				name: 'The White House',
				address: '1600 Pennsylvania Ave NW',
				city: 'Washington',
				state: 'DC',
				zip: '20500',
				owner: 2,
				sqft: 55000,
				bathrooms: 11,
				rooms: 16,
				year: 1792
			}
		]);
	});
};
