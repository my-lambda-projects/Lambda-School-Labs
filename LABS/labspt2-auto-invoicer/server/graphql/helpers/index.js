const Company = require('../../models/company');
const User = require('../../models/user');
const Customer = require('../../models/customer');
const Invoice = require('../../models/invoice');
const Item = require('../../models/item');

const { formatData } = require('./format');

const users = async userId => {
  try {
    const fetchedUsers = await User.find({
      _id: {
        $in: userId
      }
    });
    return fetchedUsers.map(user => {
      return {
        ...user._doc,
        password: null,
        companies: companies.bind(this, user._doc.companies),
        invoices: invoices.bind(this, user._doc.invoices)
      };
    });
  } catch (err) {
    throw err;
  }
};

const companies = async companyId => {
  try {
    const fetchedCompanies = await Company.find({
      _id: {
        $in: companyId
      }
    });
    return fetchedCompanies.map(company => {
      return {
        ...company._doc,
        users: users.bind(this, company._doc.users),
        customers: customers.bind(this, company._doc.customers),
        invoices: invoices.bind(this, company._doc.invoices),
        items: items.bind(this, company._doc.items)
      };
    });
  } catch (err) {
    throw err;
  }
};

const customers = async customerId => {
  try {
    const fetchedCustomers = await Customer.find({
      _id: {
        $in: customerId
      }
    });
    return fetchedCustomers.map(customer => {
      return {
        ...customer._doc,
        companies: companies.bind(this, customer._doc.companies),
        invoices: invoices.bind(this, customer._doc.invoices)
      };
    });
  } catch (err) {
    throw err;
  }
};

const invoices = async invoiceId => {
  try {
    const fetchedInvoices = await Invoice.find({ _id: { $in: invoiceId } });
    return fetchedInvoices.map(invoice => {
      return {
        ...invoice._doc,
        items: items.bind(this, invoice._doc.items)
      };
    });
  } catch (err) {
    throw err;
  }
};

const items = async itemId => {
  try {
    const fetchedItems = await Item.find({ _id: { $in: itemId } });
    return fetchedItems.map(item => {
      return {
        ...item._doc
      };
    });
  } catch (err) {
    throw err;
  }
};

const updateDocumentById = async (documentInput, id, Model) => {
  try {
    const documentExists = await Model.findById(id);
    if (!documentExists) {
      throw new Error('There is no document with the specified ID!');
    }
    Object.keys(documentInput).forEach(key => {
      if (!documentInput[key]) {
        delete documentInput[key];
      }
    });
    formatData(documentInput);
    const updatedDocument = await Model.findByIdAndUpdate(
      id,
      {
        $set: {
          ...documentInput
        }
      },
      {
        new: true
      }
    );
    const documentType = Model.modelName;
    if (documentType === 'User' || documentType === 'Customer') {
      return {
        ...updatedDocument._doc,
        companies: companies.bind(this, updatedDocument._doc.companies),
        invoices: invoices.bind(this, updatedDocument._doc.invoices)
      };
    }
    if (documentType === 'Company') {
      return {
        ...updatedDocument._doc,
        users: users.bind(this, updatedDocument._doc.users),
        customers: customers.bind(this, updatedDocument._doc.customers),
        invoices: invoices.bind(this, updatedDocument._doc.invoices),
        items: items.bind(this, updatedDocument._doc.items)
      };
    }
    return {
      ...updatedDocument._doc
    };
  } catch (err) {
    throw err;
  }
};

const findDocumentsByAnyField = async (documentInput, Model) => {
  try {
    Object.keys(documentInput).forEach(key => {
      if (!documentInput[key]) {
        delete documentInput[key];
      }
    });
    const value = Object.values(documentInput)[0];
    const fields = Object.keys(Model.schema.paths).map(field => {
      if (Model.schema.path(field).instance.toLowerCase() === typeof value) {
        return {
          [field]: value
        };
      }
    });
    const validFields = [];
    fields.map(item => {
      if (item) {
        validFields.push(item);
      }
    });
    const documents = await Model.find({
      $or: validFields
    });
    const documentType = Model.modelName;
    if (documentType === 'User' || documentType === 'Customer') {
      return documents.map(document => {
        return {
          ...document._doc,
          companies: companies.bind(this, document._doc.companies),
          invoices: invoices.bind(this, document._doc.invoices)
        };
      });
    }
    if (documentType === 'Company') {
      return documents.map(document => {
        return {
          ...document._doc,
          users: users.bind(this, document._doc.users),
          customers: customers.bind(this, document._doc.customers),
          invoices: invoices.bind(this, document._doc.invoices),
          items: items.bind(this, document._doc.items)
        };
      });
    }
    return documents.map(document => {
      return {
        ...document._doc
      };
    });
  } catch (err) {
    throw err;
  }
};

const findDocumentById = async (documentId, Model) => {
  try {
    const document = await Model.findById(documentId);
    const documentType = Model.modelName;
    if (!document) {
      throw new Error(`${documentType} with the specified ID does not exist.`);
    }
    if (documentType === 'User' || documentType === 'Customer') {
      return {
        ...document._doc,
        companies: companies.bind(this, document._doc.companies),
        invoices: invoices.bind(this, document._doc.invoices)
      };
    }
    if (documentType === 'Company') {
      return {
        ...document._doc,
        users: users.bind(this, document._doc.users),
        customers: customers.bind(this, document._doc.customers),
        invoices: invoices.bind(this, document._doc.invoices),
        items: items.bind(this, document._doc.items)
      };
    }
    return {
      ...document._doc
    };
  } catch (err) {
    throw err;
  }
};

const findAllDocuments = async Model => {
  try {
    const documents = await Model.find();
    const documentType = Model.modelName;
    if (!documents.length) {
      throw new Error(`${documentType} does not exist.`);
    }
    if (documentType === 'User' || documentType === 'Customer') {
      return documents.map(document => {
        return {
          ...document._doc,
          companies: companies.bind(this, document._doc.companies),
          invoices: invoices.bind(this, document._doc.invoices)
        };
      });
    }
    if (documentType === 'Company') {
      return documents.map(document => {
        return {
          ...document._doc,
          users: users.bind(this, document._doc.users),
          customers: customers.bind(this, document._doc.customers),
          invoices: invoices.bind(this, document._doc.invoices),
          items: items.bind(this, document._doc.items)
        };
      });
    }
    return documents.map(document => {
      return {
        ...document._doc
      };
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  updateDocumentById,
  findDocumentsByAnyField,
  findDocumentById,
  findAllDocuments,
  formatData
};
