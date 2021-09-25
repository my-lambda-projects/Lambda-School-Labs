import axios from "axios";

const inputToString = input => {
  const data = [];
  for (const key in input) {
    if (typeof input[key] === 'boolean') {
      data.push(`${key}: ${input[key]}`);
    } else {
      data.push(`${key}: "${input[key]}"`);
    }
  }
  input = data.join(", ");
  return input;
};

export const toUpdateUser = async (userID, editedData) => {
  editedData = inputToString(editedData)
  const userMutation = {
    query: `
      mutation {
        editUser(userId: "${userID}", editUserInput: {${editedData}}) {
          name, email, phoneNumber
        }
      }
    `
  }
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/graphql`,
    userMutation
  )
}

export const toUpdateInvoice = async (invoiceID, editedData) => {
  editedData = inputToString(editedData)
  const invoiceMutation = {
    query: `
      mutation {
        editInvoice(invoiceId: "${invoiceID}", editInvoiceInput: {${editedData}}) {
          hidden, balance, _id
        }
      }
    `
  }
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/graphql`,
    invoiceMutation
  ) 
}

export const toUpdateCompany = async (companyId, editedData) => {
  editedData = inputToString(editedData)
  const companyMutation = {
    query: `
      mutation {
        editCompany(companyId: "${companyId}", editCompanyInput: {${editedData}}) {
          name, email, address1, address2, phoneNumber, city, state, zipCode
        }
      }
    `
  }
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/graphql`,
    companyMutation
  )
  };

export const toSetupAccount = async (userId, userData, companyData, customerData) => {
  toUpdateUser(userId, userData);
  companyData = inputToString(companyData);
  customerData = inputToString(customerData);
  const companyMutation = {
    query: `
    mutation {
      createCompany(userId: "${userId}", companyInput: {${companyData}}) {
        _id
      }
    }`
  };
  const companyId = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/graphql`,
    companyMutation
    );
    const cid = companyId.data.data.createCompany._id;
    const customerMutation = {
      query:`
      mutation {
        createCustomer(companyId: "${cid}", customerInput: {${customerData}}) {
          _id
        }
      }
      `
    };
    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/graphql`,
       customerMutation
       )
}
