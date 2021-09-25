require('dotenv').config();

exports.seed = function(knex, Promise) {
	return knex('tenants').del().then(function() {
		return knex('tenants').insert([
			{
				email: 'kyle@tenantly.com',
				firstName: 'Kyle',
				lastName: 'Secret',
				password: process.env.password,
				phone: '203-555-1237',
				cost: 86500,
				emailSubscribe: false,
				textSubscribe: false,
				application: '',
				landlord_id: 1,
				property_id: 1
			}
		]);
	});
};
