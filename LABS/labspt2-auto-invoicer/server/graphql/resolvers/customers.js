const Customer = require('../../models/customer');
const Company = require('../../models/company');

const {
  findDocumentById,
  findAllDocuments,
  updateDocumentById
} = require('../helpers');

const { formatData } = require('../helpers/format');

module.exports = {
  customers: () => {
    return findAllDocuments(Customer);
  },
  customer: ({ customerId }) => {
    return findDocumentById(customerId, Customer);
  },
  createCustomer: async ({ customerInput, companyId }) => {
    try {
      formatData(customerInput);
      const company = await Company.findById(companyId);
      const {
        name,
        email,
        phoneNumber,
        address1,
        address2,
        zipCode,
        city,
        state
      } = customerInput;
      // only check if customer exists for company - not db-wide
      // const customerExists = await Customer.findOne({
      //   email
      // });
      // if (customerExists) {
      //   throw new Error('Customer already exists');
      // }
      const customer = new Customer({
        name,
        email,
        phoneNumber,
        address1,
        address2,
        zipCode,
        city,
        state
      });
      const newCustomer = await customer.save();
      company.customers.push(newCustomer._doc._id);
      await company.save();

      return {
        ...newCustomer._doc
      };
    } catch (error) {
      throw error;
    }
  },
  editCustomer: async ({ editCustomerInput, customerId }) => {
    return updateDocumentById(editCustomerInput, customerId, Customer);
  }
  // addCustomerToCompany: async ({ customerId, companyId }) => {
  //   try {
  //     const company = await Company.findById(companyId);
  //     const customer = await Customer.findById(customerId);
  //     if (!company) {
  //       throw new Error('Company does not exist.');
  //     }
  //     if (!customer) {
  //       throw new Error('Customer does not exist.');
  //     }
  //     // TODO: checks
  //     company.customers.push(customerId);
  //     customer.companies.push(companyId);
  //     const companyDetails = await company.save();
  //     const customerDetails = await customer.save();
  //     // TODO: allow nesting of companies on Customer
  //     return {
  //       ...customerDetails._doc
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
};
