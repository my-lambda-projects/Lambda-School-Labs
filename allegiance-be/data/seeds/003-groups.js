exports.seed = function(knex) {
	// Deletes ALL existing entries

	// Inserts seed entries
	return knex("groups").insert([
		{
			group_name: "Las Vegas Raiders Fans",
			privacy_setting: "private",
			location: "89103",
			creator_id: 1,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/oakland_raiders.png",
			acronym: "LVR",
			description: "Raiders Baby"
		},
		{
			group_name: "Miami Dolphins Fans",
			privacy_setting: "public",
			location: "33056",
			creator_id: 1,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/miami_dolphins.png",
			acronym: "MIA",
			description: "Tank for Tua"
		},
		{
			group_name: "Tennessee Titans Fans",
			privacy_setting: "public",
			location: "37213",
			creator_id: 2,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/tennessee_titans.png",
			acronym: "TEN",
			description: "Titans Fans"
		},
		{
			group_name: "Buffalo Bills",
			privacy_setting: "public",
			location: "14127",
			creator_id: 3,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/buffalo_bills.png",
			acronym: "BUF",
			description: "Bills Fans"
		},
		{
			group_name: "New England Patriots Fans",
			privacy_setting: "public",
			location: "02035",
			creator_id: 3,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/new_england_patriots.png",
			acronym: "NE",
			description: "Patriots Fans"
		},
		{
			group_name: "New York Jets Fans",
			privacy_setting: "public",
			location: "07073",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_jets.png",
			acronym: "NYJ",
			description: "Jets Fans"
		},
		{
			group_name: "Denver Broncos Fans",
			privacy_setting: "public",
			location: "80204",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/denver_broncos.png",
			acronym: "DEN",
			description: "Broncos Fans"
		},
		{
			group_name: "Kansas City Chiefs Fans",
			privacy_setting: "public",
			location: "64129",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/kansas_city_chiefs.png",
			acronym: "KC",
			description: "Chiefs Fans"
		},
		{
			group_name: "LA Chargers Fans",
			privacy_setting: "public",
			location: "90746",
			creator_id: 5,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_chargers.png",
			acronym: "LAC",
			description: "Chargers Fans"
		},
		{
			group_name: "Baltimore Ravens Fans",
			privacy_setting: "public",
			location: "21230",
			creator_id: 5,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/baltimore_ravens.png",
			acronym: "BAL",
			description: "Ravens Fans"
		},
		{
			group_name: "Cincinatti Bengals Fans",
			privacy_setting: "public",
			location: "45202",
			creator_id: 5,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/cincinnati_bengals.png",
			acronym: "CIN",
			description: "Bengals Fans"
		},
		{
			group_name: "Cleveland Browns Fans",
			privacy_setting: "public",
			location: "44114",
			creator_id: 6,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/cleveland_browns.png",
			acronym: "CLE",
			description: "Browns Fans"
		},
		{
			group_name: "Pittsburgh Steelers Fans",
			privacy_setting: "public",
			location: "15212",
			creator_id: 6,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/pittsburgh_steelers.png",
			acronym: "PIT",
			description: "Steelers Fans"
		},
		{
			group_name: "Houston Texans Fans",
			privacy_setting: "public",
			location: "77054",
			creator_id: 6,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/houston_texans.png",
			acronym: "HOU",
			description: "Texans Fans"
		},
		{
			group_name: "Indianapolis Colts Fans",
			privacy_setting: "public",
			location: "46225",
			creator_id: 6,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/indianapolis_colts.png",
			acronym: "IND",
			description: "Colts Fans"
		},
		{
			group_name: "Jacksonville Jaguars Fans",
			privacy_setting: "public",
			location: "32202",
			creator_id: 7,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/jacksonville_jaguars.png",
			acronym: "JAX",
			description: "Jaguars Fans"
		},
		{
			group_name: "Dallas Cowboys Fans",
			privacy_setting: "public",
			location: "76011",
			creator_id: 7,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/dallas_cowboys.png",
			acronym: "DAL",
			description: "Cowboys Fans"
		},
		{
			group_name: "Washington Redskins Fans",
			privacy_setting: "public",
			location: "20785",
			creator_id: 7,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/washington_redskins.png",
			acronym: "WAS",
			description: "Redskins Fans"
		},
		{
			group_name: "New York Giants Fans",
			privacy_setting: "public",
			location: "07073",
			creator_id: 1,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_giants.png",
			acronym: "NYG",
			description: "Giants Fans"
		},
		{
			group_name: "Arizona Cardinals Fans",
			privacy_setting: "public",
			location: "85305",
			creator_id: 1,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/arizona_cardinals.png",
			acronym: "AZ",
			description: "Cardinals Fans"
		},
		{
			group_name: "LA Rams Fans",
			privacy_setting: "public",
			location: "90037",
			creator_id: 1,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_rams.png",
			acronym: "LAR",
			description: "Rams Fans"
		},
		{
			group_name: "San Francisco 49ers Fans",
			privacy_setting: "public",
			location: "95054",
			creator_id: 2,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/san_francisco_49ers.png",
			acronym: "SF",
			description: "49ers Fans"
		},
		{
			group_name: "Seattle Seahawks Fans",
			privacy_setting: "public",
			location: "98134",
			creator_id: 2,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/seattle_seahawks.png",
			acronym: "SEA",
			description: "Seahawks Fans"
		},
		{
			group_name: "Chicago Bears Fans",
			privacy_setting: "public",
			location: "60605",
			creator_id: 3,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/chicago_bears.png",
			acronym: "CHI",
			description: "Bears Fans"
		},
		{
			group_name: "Detroit Lions Fans",
			privacy_setting: "public",
			location: "48226",
			creator_id: 3,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/detroit_lions.png",
			acronym: "DET",
			description: "Lions Fans"
		},
		{
			group_name: "Green Bay Packers Fans",
			privacy_setting: "public",
			location: "54307",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/green_bay_packers.png",
			acronym: "GB",
			description: "Packers Fans"
		},
		{
			group_name: "Minnesota Vikings Fans",
			privacy_setting: "public",
			location: "55415",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/minnesota_vikings.png",
			acronym: "MIN",
			description: "Vikings Fans"
		},
		{
			group_name: "Atlanta Falcons Fans",
			privacy_setting: "public",
			location: "30313",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/atlanta_falcons.png",
			acronym: "ATL",
			description: "Falcons Fans"
		},
		{
			group_name: "Carolina Panthers Fans",
			privacy_setting: "public",
			location: "28202",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/carolina_panthers.png",
			acronym: "CAR",
			description: "Panthers Fans"
		},
		{
			group_name: "New Orleans Saints Fans",
			privacy_setting: "public",
			location: "70112",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/new_orleans_saints.png",
			acronym: "NO",
			description: "Saints Fans"
		},
		{
			group_name: "Tampa Bay Buccaneers Fans",
			privacy_setting: "public",
			location: "33607",
			creator_id: 4,
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/tampa_bay_buccaneers.png",
			acronym: "TB",
			description: "Buccaneers Fans"
		}
	]);
};
