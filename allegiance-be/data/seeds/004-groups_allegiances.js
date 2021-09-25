exports.seed = function(knex) {
	// Deletes ALL existing entries

	// Inserts seed entries
	return knex("groups_allegiances").insert([
		{ group_id: 1, allegiance_id: 1 },
		{ group_id: 2, allegiance_id: 2 },
		{ group_id: 3, allegiance_id: 3 },
		{ group_id: 4, allegiance_id: 4 },
		{ group_id: 5, allegiance_id: 5 },
		{ group_id: 6, allegiance_id: 6 },
		{ group_id: 7, allegiance_id: 7 },
		{ group_id: 8, allegiance_id: 8 },
		{ group_id: 9, allegiance_id: 9 },
		{ group_id: 10, allegiance_id: 1 },
		{ group_id: 11, allegiance_id: 1 },
		{ group_id: 12, allegiance_id: 12 },
		{ group_id: 13, allegiance_id: 13 },
		{ group_id: 14, allegiance_id: 14 },
		{ group_id: 15, allegiance_id: 15 },
		{ group_id: 16, allegiance_id: 16 },
		{ group_id: 17, allegiance_id: 17 },
		{ group_id: 18, allegiance_id: 18 },
		{ group_id: 19, allegiance_id: 19 },
		{ group_id: 20, allegiance_id: 20 },
		{ group_id: 21, allegiance_id: 21 },
		{ group_id: 22, allegiance_id: 22 },
		{ group_id: 1, allegiance_id: 12 },
		{ group_id: 1, allegiance_id: 24 },
		{ group_id: 2, allegiance_id: 12 }
	]);
};
