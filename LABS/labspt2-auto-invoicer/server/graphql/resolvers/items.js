const Item = require('../../models/item');
const Company = require('../../models/company');

const { findAllDocuments, findDocumentById } = require('../helpers/index');

const { formatData } = require('../helpers/format');

module.exports = {
  item: ({ itemId }) => {
    return findDocumentById(itemId, Item);
  },
  items: () => {
    return findAllDocuments(Item);
  },
  createItem: async ({ itemInput, companyId }) => {
    try {
      formatData(itemInput);
      const company = await Company.findById(companyId);
      const { name, description, quantity, cost, amount } = itemInput;
      const item = new Item({
        name,
        description,
        quantity,
        cost,
        amount
      });
      const newItem = await item.save();
      company.items.push(newItem._doc._id);
      await company.save();
      return {
        ...newItem._doc
      };
    } catch (err) {
      throw err;
    }
  }
};
