const Invoice = require('../../models/invoice');
const Company = require('../../models/company');
const User = require('../../models/user');
const Customer = require('../../models/customer');

const {
  findDocumentById,
  findAllDocuments,
  updateDocumentById
} = require('../helpers');

module.exports = {
  invoices: () => {
    return findAllDocuments(Invoice);
  },
  invoice: ({ invoiceId }) => {
    return findDocumentById(invoiceId, Invoice);
  },
  createInvoice: async ({ invoiceInput }) => {
    const invoiceCompany = await Company.findById(invoiceInput.company._id);
    try {
      const {
        createdBy,
        number,
        description,
        terms,
        date,
        dueDate,
        company,
        customer,
        items,
        subtotal,
        discount,
        tax,
        shipping,
        total,
        balance,
        notes
      } = invoiceInput;
      const invoice = new Invoice({
        createdBy,
        number,
        description,
        terms,
        date,
        dueDate,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          phoneNumber: company.phoneNumber,
          address1: company.address1,
          address2: company.address2,
          zipCode: company.zipCode,
          city: company.city,
          state: company.state
        },
        customer: {
          _id: customer._id,
          name: customer.name,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          address1: customer.address1,
          address2: customer.address2,
          zipCode: customer.zipCode,
          city: customer.city,
          state: customer.state
        },
        items,
        subtotal,
        discount,
        tax,
        shipping,
        total,
        balance,
        notes
      });
      const newInvoice = await invoice.save();
      const invoiceUser = await User.findById(newInvoice._doc.createdBy);
      const invoiceCustomer = await Customer.findById(
        newInvoice._doc.customer._id
      );
      invoiceUser.invoices.push(newInvoice._doc._id);
      invoiceCompany.invoices.push(newInvoice._doc._id);
      invoiceCustomer.invoices.push(newInvoice._doc._id);
      await invoiceUser.save();
      await invoiceCompany.save();
      await invoiceCustomer.save();
      return {
        ...newInvoice._doc
      };
    } catch (err) {
      throw err;
    }
  },
  editInvoice: ({ editInvoiceInput, invoiceId }) => {
    return updateDocumentById(editInvoiceInput, invoiceId, Invoice);
  }
};
