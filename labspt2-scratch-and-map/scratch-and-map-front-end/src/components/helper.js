export let countries = [
  "AFG",
  "ALB",
  "DZA",
  "AGO",
  "ATA",
  "ARG",
  "ARM",
  "AU1",
  "AUT",
  "AZE",
  "BHS",
  "BGD",
  "BLR",
  "BEL",
  "BLZ",
  "BEN",
  "KAS",
  "BTN",
  "BOL",
  "BIH",
  "BWA",
  "BRA",
  "BRN",
  "BGR",
  "BFA",
  "BDI",
  "KHM",
  "CMR",
  "CAN",
  "CAF",
  "TCD",
  "CHL",
  "CH1",
  "COL",
  "COG",
  "COD",
  "CRI",
  "CIV",
  "HRV",
  "CUB",
  "CYP",
  "CZE",
  "DN1",
  "DJI",
  "DOM",
  "ECU",
  "EGY",
  "SLV",
  "GNQ",
  "ERI",
  "EST",
  "ETH",
  "ATG",
  "FJI",
  "FI1",
  "FR1",
  "AND",
  "BRB",
  "GAB",
  "GMB",
  "GEO",
  "DEU",
  "GHA",
  "GRC",
  "GRL",
  "GTM",
  "GIN",
  "GNB",
  "GUY",
  "HTI",
  "HND",
  "HUN",
  "ISL",
  "IND",
  "IDN",
  "IRN",
  "IRQ",
  "IRL",
  "IS1",
  "ITA",
  "JAM",
  "JPN",
  "JOR",
  "KAZ",
  "KEN",
  "PRK",
  "KOR",
  "KWT",
  "KGZ",
  "LAO",
  "LVA",
  "LBN",
  "LSO",
  "LBR",
  "LBY",
  "LTU",
  "LUX",
  "MKD",
  "MDG",
  "MWI",
  "MYS",
  "MLI",
  "MLT",
  "MRT",
  "MEX",
  "MDA",
  "MNG",
  "MNE",
  "MAR",
  "MOZ",
  "MMR",
  "NAM",
  "NPL",
  "NL1",
  "CPV",
  "NZ1",
  "NIC",
  "NER",
  "NGA",
  "NOR",
  "OMN",
  "PAK",
  "PAN",
  "PNG",
  "PRY",
  "PER",
  "PHL",
  "POL",
  "PRT",
  "COM",
  "QAT",
  "ROU",
  "RUS",
  "RWA",
  "SAU",
  "SEN",
  "SRB",
  "SLE",
  "SVK",
  "SVN",
  "SLB",
  "SOM",
  "ZAF",
  "SDS",
  "ESP",
  "LKA",
  "SDN",
  "SUR",
  "SWZ",
  "SWE",
  "CHE",
  "SYR",
  "TWN",
  "TJK",
  "TZA",
  "THA",
  "TLS",
  "TGO",
  "TTO",
  "TUN",
  "TUR",
  "TKM",
  "UGA",
  "UKR",
  "ARE",
  "GB1",
  "US1",
  "URY",
  "UZB",
  "VEN",
  "VNM",
  "YEM",
  "ZMB",
  "ZWE",
  "VAT",
  "VUT",
  "CYN",
  "DMA",
  "GRD",
  "KIR",
  "KOS",
  "LIE",
  "MDV",
  "MUS",
  "MCO",
  "SAH",
  "NRU",
  "PLW",
  "KNA",
  "LCA",
  "VCT",
  "WSM",
  "SMR",
  "STP",
  "SYC",
  "SGP",
  "SOL",
  "TON",
  "MHL",
  "FSM"
];

//Converts country codes into country names
export function codeToCountry(code) {
  switch (code) {
    case "AFG":
      return "Afghanistan";
    case "ALB":
      return "Albania";
    case "DZA":
      return "Algeria";
    case "AGO":
      return "Angola";
    case "ATA":
      return "Antartica";
    case "ARG":
      return "Argentina";
    case "ARM":
      return "Armenia";
    case "AUS":
      return "Australia";
    case "AUT":
      return "Austria";
    case "AZE":
      return "Azerbaijan";
    case "BHS":
      return "Bahamas";
    case "BGD":
      return "Bangledesh";
    case "BLR":
      return "Belarus";
    case "BEL":
      return "Belgium";
    case "BLZ":
      return "Belize";
    case "BEN":
      return "Benin";
    case "KAS":
      return "Kashmir";
    case "BTN":
      return "Bhutan";
    case "BOL":
      return "Bolivia";
    case "BIH":
      return "Bosnia and Herzegovina";
    case "BWA":
      return "Botswana";
    case "BRA":
      return "Brazil";
    case "BRN":
      return "Brunei";
    case "BGR":
      return "Bulgaria";
    case "BFA":
      return "Burkina Faso";
    case "BDI":
      return "Burundi";
    case "KHM":
      return "Cambodia";
    case "CMR":
      return "Cameroon";
    case "CAN":
      return "Canada";
    case "CAF":
      return "Central African Republic";
    case "TCD":
      return "Chad";
    case "CHL":
      return "Chile";
    case "CHN":
      return "China";
    case "COL":
      return "Colombia";
    case "COG":
      return "Congo";
    case "COD":
      return "Democratic Republic of the Congo";
    case "CRI":
      return "Costa Rica";
    case "CIV":
      return "Ivory Coast";
    case "HRV":
      return "Croatia";
    case "CUB":
      return "Cuba";
    case "CYP":
      return "Cyprus";
    case "CZE":
      return "Czechia";
    case "DNK":
      return "Denmark";
    case "DJI":
      return "Djibouti";
    case "DOM":
      return "Dominican Republic";
    case "ECU":
      return "Ecuador";
    case "EGY":
      return "Egypt";
    case "SLV":
      return "El Salvador";
    case "GNQ":
      return "Equatorial Guinea";
    case "ERI":
      return "Eritrea";
    case "EST":
      return "Estonia";
    case "ETH":
      return "Ethiopia";
    case "ATG":
      return "Antigua & Barbuda";
    case "FJI":
      return "Fiji";
    case "FIN":
      return "Finland";
    case "FRA":
      return "France";
    case "AND":
      return "Andorra";
    case "BRB":
      return "Barbados";
    case "GAB":
      return "Gabon";
    case "GMB":
      return "Gambia";
    case "GEO":
      return "Georgia";
    case "DEU":
      return "Germany";
    case "GHA":
      return "Ghana";
    case "GRC":
      return "Greece";
    case "GRL":
      return "Greenland";
    case "GTM":
      return "Guatemala";
    case "GIN":
      return "Guinea";
    case "GNB":
      return "Guinea-Bissau";
    case "GUY":
      return "Guyana";
    case "HTI":
      return "Haiti";
    case "HND":
      return "Honduras";
    case "HUN":
      return "Hungary";
    case "ISL":
      return "Icelend";
    case "IND":
      return "India";
    case "IDN":
      return "Indonesia";
    case "IRN":
      return "Iran";
    case "IRQ":
      return "Iraq";
    case "IRL":
      return "Ireland";
    case "ISR":
      return "Israel";
    case "ITA":
      return "Italy";
    case "JAM":
      return "Jamaica";
    case "JPN":
      return "Japan";
    case "JOR":
      return "Jordan";
    case "KAZ":
      return "Kazakhstan";
    case "KEN":
      return "Kenya";
    case "PRK":
      return "North Korea";
    case "KOR":
      return "South Korea";
    case "KWT":
      return "Kuwait";
    case "KGZ":
      return "Krygyzstan";
    case "LAO":
      return "Laos";
    case "LVA":
      return "Latvia";
    case "LBN":
      return "Lebanon";
    case "LSO":
      return "Lesoto";
    case "LBR":
      return "Liberia";
    case "LBY":
      return "Libya";
    case "LTU":
      return "Lithuania";
    case "LUX":
      return "Luxembourg";
    case "MKD":
      return "Macedonia";
    case "MDG":
      return "Madagascar";
    case "MWI":
      return "Malawi";
    case "MYS":
      return "Malaysia";
    case "MLI":
      return "Mali";
    case "MLT":
      return "Malta";
    case "MRT":
      return "Mauritania";
    case "MEX":
      return "Mexico";
    case "MDA":
      return "Moldova";
    case "MNG":
      return "Mongolia";
    case "MNE":
      return "Montenegro";
    case "MAR":
      return "Morocco";
    case "MOZ":
      return "Mozambique";
    case "MMR":
      return "Myanmar";
    case "NAM":
      return "Namibia";
    case "NPL":
      return "Nepal";
    case "NLD":
      return "Netherlands";
    case "CPV":
      return "Cabo Verde";
    case "NZL":
      return "New Zealand";
    case "NIC":
      return "Nicaragua";
    case "NER":
      return "Niger";
    case "NGA":
      return "Nigeria";
    case "NOR":
      return "Norway";
    case "OMN":
      return "Oman";
    case "PAK":
      return "Pakistan";
    case "PAN":
      return "Panama";
    case "PNG":
      return "Papua New Guinea";
    case "PRY":
      return "Paraguay";
    case "PER":
      return "Peru";
    case "PHL":
      return "Phillippines";
    case "POL":
      return "Poland";
    case "PRT":
      return "Portugal";
    case "COM":
      return "Comoros";
    case "QAT":
      return "Qatar";
    case "ROU":
      return "Romania";
    case "RUS":
      return "Russia";
    case "RWA":
      return "Rwanda";
    case "SAU":
      return "Saudi Arabia";
    case "SEN":
      return "Senegal";
    case "SRB":
      return "Serbia";
    case "SLE":
      return "Sierra Leone";
    case "SVK":
      return "Slovakia";
    case "SVN":
      return "Slovenia";
    case "SLB":
      return "Solomon Islands";
    case "SOM":
      return "Somolia";
    case "ZAF":
      return "South Africa";
    case "SSD":
      return "South Sudan";
    case "ESP":
      return "Spain";
    case "LKA":
      return "Sri Lanka";
    case "SDN":
      return "Sudan";
    case "SUR":
      return "Suriname";
    case "SWZ":
      return "Swaziland";
    case "SWE":
      return "Sweden";
    case "CHE":
      return "Switzerland";
    case "SYR":
      return "Syria";
    case "TWN":
      return "Taiwan";
    case "TJK":
      return "Tajikistan";
    case "TZA":
      return "Tanzania";
    case "THA":
      return "Thailand";
    case "TLS":
      return "Timor-Leste";
    case "TGO":
      return "Togo";
    case "TTO":
      return "Trinidad & Tobago";
    case "TUN":
      return "Tunisia";
    case "TUR":
      return "Turkey";
    case "TKM":
      return "Turkmeristan";
    case "UGA":
      return "Uganda";
    case "UKR":
      return "Ukraine";
    case "ARE":
      return "United Arab Emirates";
    case "GBR":
      return "United Kingdom of Great Britain & Nothern Ireland";
    case "USA":
      return "United States of America";
    case "URY":
      return "Uruguay";
    case "UZB":
      return "Uzbekistan";
    case "VEN":
      return "Venezuela";
    case "VNM":
      return "Vietnam";
    case "YEM":
      return "Yemen";
    case "ZMB":
      return "Zamibia";
    case "ZWE":
      return "Zimbabwe";
    case "VAT":
      return "Vatican City";
    case "VUT":
      return "Vanuatu";
    case "CYN":
      return "Nothern Cyprus";
    case "DMA":
      return "Dominica";
    case "GRD":
      return "Grenada";
    case "KIR":
      return "Kiribati";
    case "KOS":
      return "Kosovo";
    case "LIE":
      return "Liechtenstein";
    case "MDV":
      return "Maldives";
    case "MUS":
      return "Mauritius";
    case "MCO":
      return "Monoco";
    case "SAH":
      return "Western Sahara";
    case "NRU":
      return "Nauru";
    case "PLW":
      return "Palau";
    case "KNA":
      return "St. Kitts & Nevis";
    case "LCA":
      return "St. Lucia";
    case "VCT":
      return "St. Vincent & the Grenadines";
    case "WSM":
      return "Samoa";
    case "SMR":
      return "San Marino";
    case "STP":
      return "Sao Tome & Principe";
    case "SYC":
      return "Seychelles";
    case "SGP":
      return "Singapore";
    case "SOL":
      return "Somaliland";
    case "TON":
      return "Tonga";
    case "MHL":
      return "Marshall Islands";
    case "FSM":
      return "Micronesia";
  }
}

//Converts country names into country codes
export function countryToCode(country) {
  switch (country) {
    case "Afghanistan":
      return "AFG";
    case "Albania":
      return "ALB";
    case "Algeria":
      return "DZA";
    case "Angola":
      return "AGO";
    case "Antartica":
      return "ATA";
    case "Argentina":
      return "ARG";
    case "Armenia":
      return "ARM";
    case "Australia":
      return "AU1";
    case "Austria":
      return "AUT";
    case "Azerbaijan":
      return "AZE";
    case "Bahamas":
      return "BHS";
    case "Bangledesh":
      return "BGD";
    case "Belarus":
      return "BLR";
    case "Belgium":
      return "BEL";
    case "Belize":
      return "BLZ";
    case "Benin":
      return "BEN";
    case "Kashmir":
      return "KAS";
    case "BTN":
      return "BTN";
    case "Bolivia":
      return "BOL";
    case "Bosnia and Herzegovina":
      return "BIH";
    case "Botswana":
      return "BWA";
    case "Brazil":
      return "BRA";
    case "Brunei":
      return "BRN";
    case "Bulgaria":
      return "BGR";
    case "Burkina Faso":
      return "BFA";
    case "Burundi":
      return "BDI";
    case "Cambodia":
      return "KHM";
    case "CMR":
      return "Cameroon";
    case "Canada":
      return "CAN";
    case "Central African Republic":
      return "CAF";
    case "Chad":
      return "TCD";
    case "Chile":
      return "CHL";
    case "China":
      return "CH1";
    case "Colombia":
      return "COL";
    case "Congo":
      return "COG";
    case "Democratic Republic of the Congo":
      return "COD";
    case "Costa Rica":
      return "CRI";
    case "Ivory Coast":
      return "CIV";
    case "Croatia":
      return "HRV";
    case "Cuba":
      return "CUB";
    case "Cyprus":
      return "CYP";
    case "Czechia":
      return "CZE";
    case "Denmark":
      return "DN1";
    case "Djibouti":
      return "DJI";
    case "Dominican Republic":
      return "DOM";
    case "Ecuador":
      return "ECU";
    case "Egypt":
      return "EGY";
    case "El Salvador":
      return "SLV";
    case "Equatorial Guinea":
      return "GNQ";
    case "Eritrea":
      return "ERI";
    case "Estonia":
      return "EST";
    case "Ethiopia":
      return "ETH";
    case "Antigua & Barbuda":
      return "ATG";
    case "Fiji":
      return "FJI";
    case "Finland":
      return "FI1";
    case "France":
      return "FR1";
    case "Andorra":
      return "AND";
    case "Barbados":
      return "BRB";
    case "Gabon":
      return "GAB";
    case "Gambia":
      return "GMB";
    case "Georgia":
      return "GEO";
    case "Germany":
      return "DEU";
    case "Ghana":
      return "GHA";
    case "Greece":
      return "GRC";
    case "Greenland":
      return "GRL";
    case "Guatemala":
      return "GTM";
    case "Guinea":
      return "GIN";
    case "Guinea-Bissau":
      return "GNB";
    case "Guyana":
      return "GUY";
    case "Haiti":
      return "HTI";
    case "Honduras":
      return "HND";
    case "Hungary":
      return "HUN";
    case "Icelend":
      return "ISL";
    case "India":
      return "IND";
    case "Indonesia":
      return "IDN";
    case "Iran":
      return "IRN";
    case "Iraq":
      return "IRQ";
    case "Ireland":
      return "IRL";
    case "Israel":
      return "IS1";
    case "Italy":
      return "ITA";
    case "Jamaica":
      return "JAM";
    case "Japan":
      return "JPN";
    case "Jordan":
      return "JOR";
    case "Kazakhstan":
      return "KAZ";
    case "Kenya":
      return "KEN";
    case "North Korea":
      return "PRK";
    case "South Korea":
      return "KOR";
    case "Kuwait":
      return "KWT";
    case "Krygyzstan":
      return "KGZ";
    case "Laos":
      return "LAO";
    case "Latvia":
      return "LVA";
    case "Lebanon":
      return "LBN";
    case "Lesoto":
      return "LSO";
    case "Liberia":
      return "LBR";
    case "Libya":
      return "LBY";
    case "Lithuania":
      return "LTU";
    case "Luxembourg":
      return "LUX";
    case "Macedonia":
      return "MKD";
    case "Madagascar":
      return "MDG";
    case "Malawi":
      return "MWI";
    case "Malaysia":
      return "MYS";
    case "Mali":
      return "MLI";
    case "Malta":
      return "MLT";
    case "Mauritania":
      return "MRT";
    case "Mexico":
      return "MEX";
    case "Moldova":
      return "MDA";
    case "Mongolia":
      return "MNG";
    case "Montenegro":
      return "MNE";
    case "Morocco":
      return "MAR";
    case "Mozambique":
      return "MOZ";
    case "Myanmar":
      return "MMR";
    case "Namibia":
      return "NAM";
    case "Nepal":
      return "NPL";
    case "Netherlands":
      return "NL1";
    case "Cabo Verde":
      return "CPV";
    case "New Zealand":
      return "NZ1";
    case "Nicaragua":
      return "NIC";
    case "Niger":
      return "NER";
    case "Nigeria":
      return "NGA";
    case "Norway":
      return "NOR";
    case "Oman":
      return "OMN";
    case "Pakistan":
      return "PAK";
    case "Panama":
      return "PAN";
    case "Papua New Guinea":
      return "PNG";
    case "Paraguay":
      return "PRY";
    case "Peru":
      return "PER";
    case "Phillippines":
      return "PHL";
    case "Poland":
      return "POL";
    case "Portugal":
      return "PRT";
    case "Comoros":
      return "COM";
    case "Qatar":
      return "QAT";
    case "Romania":
      return "ROU";
    case "Russia":
      return "RUS";
    case "Rwanda":
      return "RWA";
    case "Saudi Arabia":
      return "SAU";
    case "Senegal":
      return "SEN";
    case "Serbia":
      return "SRB";
    case "Sierra Leone":
      return "SLE";
    case "Slovakia":
      return "SVK";
    case "Slovenia":
      return "SVN";
    case "Solomon Islands":
      return "SLB";
    case "Somolia":
      return "SOM";
    case "South Africa":
      return "ZAF";
    case "South Sudan":
      return "SSD";
    case "Spain":
      return "ESP";
    case "Sri Lanka":
      return "LKA";
    case "Sudan":
      return "SDN";
    case "Suriname":
      return "SUR";
    case "Swaziland":
      return "SWZ";
    case "Sweden":
      return "SWE";
    case "Switzerland":
      return "CHE";
    case "Syria":
      return "SYR";
    case "Taiwan":
      return "TWN";
    case "Tajikistan":
      return "TJK";
    case "Tanzania":
      return "TZA";
    case "Thailand":
      return "THA";
    case "Timor-Leste":
      return "TLS";
    case "Togo":
      return "TGO";
    case "Trinidad & Tobago":
      return "TTO";
    case "Tunisia":
      return "TUN";
    case "Turkey":
      return "TUR";
    case "Turkmeristan":
      return "TKM";
    case "Uganda":
      return "UGA";
    case "Ukraine":
      return "UKR";
    case "United Arab Emirates":
      return "ARE";
    case "United Kingdom of Great Britain & Nothern Ireland":
      return "GB1";
    case "United States of America":
      return "US1";
    case "Uruguay":
      return "URY";
    case "Uzbekistan":
      return "UZB";
    case "Venezuela":
      return "VEN";
    case "Vietnam":
      return "VNM";
    case "Yemen":
      return "YEM";
    case "Zamibia":
      return "ZMB";
    case "Zimbabwe":
      return "ZWE";
    case "Vatican City":
      return "VAT";
    case "Vanuatu":
      return "VUT";
    case "Nothern Cyprus":
      return "CYN";
    case "Dominica":
      return "DMA";
    case "Grenada":
      return "GRD";
    case "Kiribati":
      return "KIR";
    case "Kosovo":
      return "KOS";
    case "Liechtenstein":
      return "LIE";
    case "Maldives":
      return "MDV";
    case "Mauritius":
      return "MUS";
    case "Monoco":
      return "MCO";
    case "Western Sahara":
      return "SAH";
    case "Nauru":
      return "NRU";
    case "Palau":
      return "PLW";
    case "St. Kitts & Nevis":
      return "KNA";
    case "St. Lucia":
      return "LCA";
    case "St. Vincent & the Grenadines":
      return "VCT";
    case "Samoa":
      return "WSM";
    case "San Marino":
      return "SMR";
    case "Sao Tome & Principe":
      return "STP";
    case "Seychelles":
      return "SYC";
    case "Singapore":
      return "SGP";
    case "Somaliland":
      return "SOL";
    case "Tonga":
      return "TON";
    case "Marshall Islands":
      return "MHL";
    case "Micronesia":
      return "FSM";
  }
}

//Converts non-standard geoJson codes to standard code for restCountries API
export function restCountryConversion(code) {
  if (code === "NL1") {
    return "NLD";
  } else if (code === "NZ1") {
    return "NZL";
  } else if (code === "GB1") {
    return "GBR";
  } else if (code === "US1") {
    return "USA";
  } else if (code === "SAH") {
    return "ESH";
  } else if (code === "SOL") {
    return "SOM";
  } else if (code === "KAS") {
    return "IND";
  } else if (code === "CH1") {
    return "CHN";
  } else if (code === "DN1") {
    return "DNK";
  } else if (code === "FR1") {
    return "FRA";
  } else if (code === "FI1") {
    return "FIN";
  } else if (code === "IS1") {
    return "ISR";
  } else if (code === "CYN") {
    return "CYP";
  } else if (code === "AU1") {
    return "AUS";
  } else if (code === "SDS") {
    return "SSD";
  } else if (code === "PR1") {
    return "PRT";
  } else if (code === "PN1") {
    return "PHL";
  } else if (code === "B77") {
    return "TWN";
  } else {
    return code;
  }
}


export function reverseCountryConversion(code) {
  if (code === "NLD") {
    return "NL1";
  } else if (code === "NZL") {
    return "NZ1";
  } else if (code === "GBR") {
    return "GB1";
  } else if (code === "USA") {
    return "US1";
  } else if (code === "ESH") {
    return "SAH";
  } else if (code === "CHN") {
    return "CH1";
  } else if (code === "DNK") {
    return "DN1";
  } else if (code === "FRA") {
    return "FR1";
  } else if (code === "FIN") {
    return "FI1";
  } else if (code === "ISR") {
    return "IS1";
  } else if (code === "CYP") {
    return "CYN";
  } else if (code === "AUS") {
    return "AU1";
  } else if (code === "SSD") {
    return "SDS";
  } else if (code === "PRT") {
    return "PR1";
  } else if (code === "PNL") {
    return "PH1";
  } else if (code === "TWN") {
    return "B77";
  } else {
    return code;
  }
}


//Code for country cards (save for later)
String.prototype.toProperCase = function() {
  var words = this.split(" ");
  var results = [];
  for (var i = 0; i < words.length; i++) {
    var letter = words[i].charAt(0).toUpperCase();
    results.push(letter + words[i].slice(1));
  }
  return results.join(" ");
};

countries.forEach(country => {
  let code = restCountryConversion(country);
  fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      let currency = res.currencies[0].name;
      if (currency === "[E]" || currency === "[D]") {
        currency = "United States Dollar";
      }
      //   console.log("Country: " + res.name, "Capital: " + res.capital,
      //               "Currency: " + currency.toProperCase(), "Language: " + res.languages[0].name, "Flag: " + res.flag);
    });
});

export function returnCode(id) {
  // let new_id = id - 1;
  return countries[id];
}

export function returnId(code) {
  let id = countries.indexOf(code);
  return id;
}

 