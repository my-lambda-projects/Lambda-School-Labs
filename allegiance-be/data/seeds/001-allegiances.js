exports.seed = function(knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("allegiances").insert([
    // NFL TEAMS
    {
      allegiance_name: "Las Vegas Raiders",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/oakland_raiders.png"
    },
    {
      allegiance_name: "Miami Dolphins",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/miami_dolphins.png"
    },
    {
      allegiance_name: "Tennessee Titans",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/tennessee_titans.png"
    },
    {
      allegiance_name: "Buffalo Bills",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/buffalo_bills.png"
    },
    {
      allegiance_name: "New England Patriots",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_england_patriots.png"
    },
    {
      allegiance_name: "New York Jets",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_jets.png"
    },
    {
      allegiance_name: "Denver Broncos",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/denver_broncos.png"
    },
    {
      allegiance_name: "Kansas City Chiefs",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/kansas_city_chiefs.png"
    },
    {
      allegiance_name: "LA Chargers",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_chargers.png"
    },
    {
      allegiance_name: "Baltimore Ravens",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/baltimore_ravens.png"
    },
    {
      allegiance_name: "Cincinatti Bengals",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/cincinnati_bengals.png"
    },
    {
      allegiance_name: "Cleveland Browns",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/cleveland_browns.png"
    },
    {
      allegiance_name: "Pittsburgh Steelers",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/pittsburgh_steelers.png"
    },
    {
      allegiance_name: "Houston Texans",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/houston_texans.png"
    },
    {
      allegiance_name: "Indianapolis Colts",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/indianapolis_colts.png"
    },
    {
      allegiance_name: "Jacksonville Jaguars",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/jacksonville_jaguars.png"
    },
    {
      allegiance_name: "Dallas Cowboys",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/dallas_cowboys.png"
    },
    {
      allegiance_name: "Washington Redskins",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/washington_redskins.png"
    },
    {
      allegiance_name: "New York Giants",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_giants.png"
    },
    {
      allegiance_name: "Arizona Cardinals",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/arizona_cardinals.png"
    },
    {
      allegiance_name: "LA Rams",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_rams.png"
    },
    {
      allegiance_name: "San Francisco 49ers",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/san_francisco_49ers.png"
    },
    {
      allegiance_name: "Seattle Seahawks",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/seattle_seahawks.png"
    },
    {
      allegiance_name: "Chicago Bears",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/chicago_bears.png"
    },
    {
      allegiance_name: "Detroit Lions",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/detroit_lions.png"
    },
    {
      allegiance_name: "Green Bay Packers",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/green_bay_packers.png"
    },
    {
      allegiance_name: "Minnesota Vikings",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/minnesota_vikings.png"
    },
    {
      allegiance_name: "Atlanta Falcons",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/atlanta_falcons.png"
    },
    {
      allegiance_name: "Carolina Panthers",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/carolina_panthers.png"
    },
    {
      allegiance_name: "New Orleans Saints",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_orleans_saints.png"
    },
    {
      allegiance_name: "Tampa Bay Buccaneers",
      sport: "NFL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/tampa_bay_buccaneers.png"
    },
    //MLB Teams
    {
      allegiance_name: "Atlanta Braves",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/atlanta_braves.png"
    },
    {
      allegiance_name: "Miami Marlins",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/miami_marlins.png"
    },
    {
      allegiance_name: "New York Mets",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_mets.png"
    },
    {
      allegiance_name: "Philadelphia Phillies",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/philadelphia_phillies.png"
    },
    {
      allegiance_name: "Washington Nationals",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/washington_nationals.png"
    },
    {
      allegiance_name: "Chicago Cubs",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/chicago_cubs.png"
    },
    {
      allegiance_name: "Cincinnati Reds",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/cincinnati_reds.png"
    },
    {
      allegiance_name: "Milwaukee Brewers",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/milwaukee_brewers.png"
    },
    {
      allegiance_name: "Pittsburgh Pirates",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/pittsburgh_pirates.png"
    },
    {
      allegiance_name: "St. Louis Cardinals",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/st_louis_cardinals.png"
    },
    {
      allegiance_name: "Arizona Diamondbacks",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/arizona_diamondbacks.png"
    },
    {
      allegiance_name: "Colorado Rockies",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/colorado_rockies.png"
    },
    {
      allegiance_name: "Los Angeles Dodgers",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_dodgers.png"
    },
    {
      allegiance_name: "San Diego Padres",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/san_diego_padres.png"
    },
    {
      allegiance_name: "San Francisco Giants",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/san_francisco_giants.png"
    },
    {
      allegiance_name: "Baltimore Orioles",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/baltimore_orioles.png"
    },
    {
      allegiance_name: "Boston Red Sox",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/boston_red_sox.png"
    },
    {
      allegiance_name: "New York Yankees",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_yankees.png"
    },
    {
      allegiance_name: "Tampa Bay Rays",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/tampa_bay_rays.png"
    },
    {
      allegiance_name: "Toronto Blue Jays",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/toronto_blue_jays.png"
    },
    {
      allegiance_name: "Chicago White Sox",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/chicago_white_sox.png"
    },
    {
      allegiance_name: "Cleveland Indians",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/cleveland_indians.png"
    },
    {
      allegiance_name: "Detroit Tigers",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/detroit_tigers.png"
    },
    {
      allegiance_name: "Kansas City Royals",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/kansas_city_royals.png"
    },
    {
      allegiance_name: "Minnesota Twins",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/minnesota_twins.png"
    },
    {
      allegiance_name: "Houston Astros",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/houston_astros.png"
    },
    {
      allegiance_name: "Los Angeles Angels",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_angels.png"
    },
    {
      allegiance_name: "Oakland Athletics",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/oakland_athletics.png"
    },
    {
      allegiance_name: "Seattle Mariners",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/seattle_mariners.png"
    },
    {
      allegiance_name: "Texas Rangers",
      sport: "MLB",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/texas_rangers.png"
    },
    // NBA Teams
    {
      allegiance_name: "Atlanta Hawks",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/atlanta_hawks.png"
    },
    {
      allegiance_name: "Boston Celtics",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/boston_celtics.png"
    },
    {
      allegiance_name: "Brooklyn Nets",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/brooklyn_nets.png"
    },
    {
      allegiance_name: "Charlotte Hornets",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/charlotte_hornets.png"
    },
    {
      allegiance_name: "Chicago Bulls",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/chicago_bulls.png"
    },
    {
      allegiance_name: "Cleveland Cavaliers",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/cleveland_cavaliers.png"
    },
    {
      allegiance_name: "Dallas Mavericks",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/dallas_mavericks.png"
    },
    {
      allegiance_name: "Denver Nuggets",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/denver_nuggets.png"
    },
    {
      allegiance_name: "Detroit Pistons",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/detroit_pistons.png"
    },
    {
      allegiance_name: "Golden State Warriors",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/golden_state_warriors.png"
    },
    {
      allegiance_name: "Houston Rockets",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/houston_rockets.png"
    },
    {
      allegiance_name: "Indiana Pacers",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/indiana_pacers.png"
    },
    {
      allegiance_name: "Los Angeles Clippers",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_clippers.png"
    },
    {
      allegiance_name: "Los Angeles Lakers",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_lakers.png"
    },
    {
      allegiance_name: "Memphis Grizzlies",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/memphis_grizzlies.png"
    },
    {
      allegiance_name: "Miami Heat",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/miami_heat.png"
    },
    {
      allegiance_name: "Milwaukee Bucks",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/milwaukee_bucks.png"
    },
    {
      allegiance_name: "Minnesota Timberwolves",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/minnesota_timberwolves.png"
    },
    {
      allegiance_name: "New Orleans Pelicans",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_orleans_pelicans.png"
    },
    {
      allegiance_name: "New York Knicks",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_knicks.png"
    },
    {
      allegiance_name: "Oklahoma City Thunder",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/oklahoma_city_thunder.png"
    },
    {
      allegiance_name: "Orlando Magic",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/orlando_magic.png"
    },
    {
      allegiance_name: "Philadelphia 76ers",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/philadelphia_76ers.png"
    },
    {
      allegiance_name: "Phoenix Suns",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/phoenix_suns.png"
    },
    {
      allegiance_name: "Portland Trail Blazers",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/portland_trail_blazers.png"
    },
    {
      allegiance_name: "Sacramento Kings",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/sacramento_kings.png"
    },
    {
      allegiance_name: "San Antonio Spurs",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/san_antonio_spurs.png"
    },
    {
      allegiance_name: "Toronto Raptors",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/toronto_raptors.png"
    },
    {
      allegiance_name: "Utah Jazz",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/utah_jazz.png"
    },
    {
      allegiance_name: "Washington Wizards",
      sport: "NBA",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/washington_wizards.png"
    },
    // NHL Teams
    {
      allegiance_name: "Anaheim Ducks",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/anaheim_ducks.png"
    },
    {
      allegiance_name: "Arizona Coyotes",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/arizona_coyotes.png"
    },
    {
      allegiance_name: "Boston Bruins",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/boston_bruins.png"
    },
    {
      allegiance_name: "Buffalo Sabres",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/buffalo_sabres.png"
    },
    {
      allegiance_name: "Calgary Flames",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/calgary_flames.png"
    },
    {
      allegiance_name: "Carolina Hurricanes",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/carolina_hurricanes.png"
    },
    {
      allegiance_name: "Chicago Blackhawks",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/chicago_blackhawks.png"
    },
    {
      allegiance_name: "Colorado Avalanche",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/colorado_avalanche.png"
    },
    {
      allegiance_name: "Columbus Blue Jackets",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/columbus_blue_jackets.png"
    },
    {
      allegiance_name: "Dallas Stars",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/dallas_stars.png"
    },
    {
      allegiance_name: "Detroit Red Wings",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/detroit_red_wings.png"
    },
    {
      allegiance_name: "Edmonton Oilers",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/edmonton_oilers.png"
    },
    {
      allegiance_name: "Florida Panthers",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/florida_panthers.png"
    },
    {
      allegiance_name: "Los Angeles Kings",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/los_angeles_kings.png"
    },
    {
      allegiance_name: "Minnesota Wild",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/minnesota_wild.png"
    },
    {
      allegiance_name: "Montreal Canadiens",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/montreal_canadiens.png"
    },
    {
      allegiance_name: "Nashville Predators",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/nashville_predators.png"
    },
    {
      allegiance_name: "New Jersey Devils",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_jersey_devils.png"
    },
    {
      allegiance_name: "New York Islanders",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_islanders.png"
    },
    {
      allegiance_name: "New York Rangers",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/new_york_rangers.png"
    },
    {
      allegiance_name: "Ottawa Senators",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/ottawa_senators.png"
    },
    {
      allegiance_name: "Philadelphia Flyers",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/philadelphia_flyers.png"
    },
    {
      allegiance_name: "Pittsburgh Penguins",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/pittsburgh_penguins.png"
    },
    {
      allegiance_name: "San Jose Sharks",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/san_jose_sharks.png"
    },
    {
      allegiance_name: "St. Louis Blues",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/st_louis_blues.png"
    },
    {
      allegiance_name: "Tampa Bay Lightning",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/tampa_bay_lightning.png"
    },
    {
      allegiance_name: "Toronto Maple Leafs",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/toronto_maple_leafs.png"
    },
    {
      allegiance_name: "Vancouver Canucks",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/vancouver_canucks.png"
    },
    {
      allegiance_name: "Vegas Golden Knights",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/vegas_golden_knights.png"
    },
    {
      allegiance_name: "Washington Capitals",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/washington_capitals.png"
    },
    {
      allegiance_name: "Winnipeg Jets",
      sport: "NHL",
      image:
        "https://cdn.bleacherreport.net/images/team_logos/328x328/winnipeg_jets.png"
    }
  ]);
};
