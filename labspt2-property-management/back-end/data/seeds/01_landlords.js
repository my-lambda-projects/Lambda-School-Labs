require('dotenv').config();

exports.seed = function(knex, Promise) {
	return knex('landlords').del().then(function() {
		return knex('landlords').insert([
			{
				id: 1,
				email: 'lee@tenantly.com',
				firstName: 'Lee',
				lastName: 'Secret',
				password: process.env.password,
				phone: '203-555-1234',
				cost: 75000,
				emailSubscribe: false,
				textSubscribe: false,
				application: ''
			},
			{
				id: 2,
				email: 'matt@tenantly.com',
				firstName: 'Matt',
				lastName: 'Secret',
				password: process.env.password,
				phone: '203-555-1235',
				cost: 80000,
				emailSubscribe: false,
				textSubscribe: false,
				application: ''
			},
			{
				id: 3,
				email: 'victor@tenantly.com',
				firstName: 'Victor',
				lastName: 'Secret',
				password: process.env.password,
				phone: '203-555-1236',
				cost: 100000,
				emailSubscribe: false,
				textSubscribe: false,
				application: ''
			}
		]);
	});
};
