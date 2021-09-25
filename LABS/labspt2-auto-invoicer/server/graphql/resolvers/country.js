const countryCodes = require('country-telephone-data');

module.exports = {
  countries: () => {
    const { allCountries } = countryCodes;
    return allCountries.map(country => {
      return country;
    });
  },

  country: ({ name, iso2 }) => {
    if (!name && !iso2) {
      throw new Error('please pick a name or iso2');
    }
    const { allCountries } = countryCodes;
    if (name) {
      const selected = allCountries.filter(country => {
        return country.name === name;
      });
      return selected[0];
    }
    const selected = allCountries.filter(country => {
      return country.iso2 === iso2;
    });
    return selected[0];
  }
};
