exports.seed = function(knex, promise) {
	return knex('billing').del().then(function() {
		return knex('billing').insert([
			{
				property_id: 1,
				property_name: 'Incubators Galore',
				date: 1550625630,
				amount: '$242'
			},
			{
				property_id: 2,
				property_name: 'The White House',
				date: 1550626830,
				amount: '$432'
			},
			{
				property_id: 1,
				property_name: 'Incubators Galore',
				date: 1550628701,
				amount: '$444'
			},
			{
				property_id: 2,
				property_name: 'The White House',
				date: 1550626021,
				amount: '$305'
			}
		]);
	});
};
