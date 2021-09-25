exports.seed = function(knex, promise) {
	return knex('workorders').del().then(function() {
		return knex('workorders').insert([
			{
				property_id: 1,
				tenant_id: 1,
				landlord_id: 1,
				description: 'Air conditioner does not blow cold air!',
				phone: '415-555-6132',
				entry: true,
				status: 'Pending'
			},
			{
				property_id: 2,
				tenant_id: 1,
				landlord_id: 1,
				description: 'None of the toilets flush!',
				phone: '202-555-6132',
				entry: true,
				status: 'Pending'
			}
		]);
	});
};
