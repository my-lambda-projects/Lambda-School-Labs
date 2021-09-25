// tbl.increments('id').primary(); // primary key
// tbl.integer('owner').references('id').inTable('users');
// tbl.string('title', 100).notNullable();
// tbl.dateTime('eventDate').notNullable();
// tbl.boolean('activated').notNullable().defaultTo(false);
// tbl.boolean('completed').notNullable().defaultTo(false);

exports.seed = function(knex, Promise) {
	return knex('events')
		.del() // delete all user's
		.then(function() {
			return knex('events').insert([
				{
					owner: 2,
					title: "Swim Tournament",
					eventDate: "2018-04-11 12:30:00",
				},
				{
					owner: 3,
					title: "Chess Tournament",
					eventDate: "2018-04-12 12:30:00",
				},
				{
					owner: 4,
					title: "Choir Performance",
					eventDate: "2018-04-13 12:30:00",
				},
				{
					owner: 2,
					title: "Track & Field Tournament",
					eventDate: "2018-04-14 12:30:00",
				},
				{
					owner: 3,
					title: "Basketball Tournament",
					eventDate: "2018-04-15 12:30:00",
				}
			]);
		});
	
};