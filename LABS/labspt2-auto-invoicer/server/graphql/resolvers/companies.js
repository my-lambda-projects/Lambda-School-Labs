const Company = require('../../models/company');
const User = require('../../models/user');

const {
  updateDocumentById,
  findDocumentsByAnyField,
  findDocumentById,
  findAllDocuments
} = require('../helpers');

const { formatData } = require('../helpers/format');

module.exports = {
  company: ({ companyId }) => {
    return findDocumentById(companyId, Company);
  },
  companyByAnyField: ({ companyInput }) => {
    return findDocumentsByAnyField(companyInput, Company);
  },
  companies: () => {
    return findAllDocuments(Company);
  },
  createCompany: async ({ companyInput, userId }) => {
    try {
      formatData(companyInput);
      const user = await User.findById(userId);
      const {
        name,
        email,
        phoneNumber,
        address1,
        address2,
        zipCode,
        city,
        state
      } = companyInput;
      // check if company exists for user
      // const companyExists = await Company.findOne({
      //   email
      // });
      // if (companyExists) {
      //   throw new Error('This company already exists!');
      // }
      const company = new Company({
        name,
        email,
        phoneNumber,
        address1,
        address2,
        zipCode,
        city,
        state
      });
      company.users.push(userId);
      const newCompany = await company.save();
      user.companies.push(newCompany._doc._id);
      await user.save();
      return {
        ...newCompany._doc
      };
    } catch (err) {
      throw err;
    }
  },
  editCompany: ({ editCompanyInput, companyId }) => {
    return updateDocumentById(editCompanyInput, companyId, Company);
  }
  // buyPlanOrCredits: async ({ companyId, quantity }) => {
  //   const company = await Company.findById(companyId);
  //   if (quantity) {
  //     company.credits += quantity;
  //   } else {
  //     company.premium = true;
  //   }
  //   const newCompany = await company.save();
  //   return newCompany._doc;
  // }
};
