const usersResolver = require('./users');
const companiesResolver = require('./companies');
const customersResolver = require('./customers');
const countryResolver = require('./country');
const invoiceResolver = require('./invoices');
const itemResolver = require('./items');

const rootResolver = {
  ...usersResolver,
  ...companiesResolver,
  ...customersResolver,
  ...countryResolver,
  ...invoiceResolver,
  ...itemResolver
};

module.exports = rootResolver;
