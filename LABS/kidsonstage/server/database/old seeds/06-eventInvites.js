exports.seed = function(knex, Promise) {
	return knex('eventInvites')
		.del() // delete all user's
		.then(function() {
			return knex('eventInvites').insert([
				{
					eventId: 1,
					userId: 5
				},
				{
					eventId: 2,
					userId: 5
				},
				{
					eventId: 3,
					userId: 6
				},
				{
					eventId: 4,
					userId: 7
				},
				{
					eventId: 5,
					userId: 6
				},
				{
					eventId: 1,
					userId: 7
				},
				{
					eventId: 2,
					userId: 7
				},
				{
					eventId: 3,
					userId: 5
				},
				{
					eventId: 4,
					userId: 6
				},
				
			]);
		});
	
};