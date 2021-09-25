import { Post, inputToString } from '../index';

export const CreateCustomer = async (
  customerInput,
  companyId,
  returnedData
) => {
  const result = inputToString(customerInput);

  const CreateCustomer = {
    query: `
      mutation {
        createCustomer(customerInput: {${result}}, companyId: "${companyId}") {
          ${returnedData}
        }
      }
    `
  };
  const newCustomer = await Post(CreateCustomer);
  return newCustomer.data.data;
};

export const EditCustomer = async (customerId, editedData, returnedData) => {
  inputToString(editedData);

  const EditCustomer = {
    query: `
      mutation {
        editCustomer(customerId: "${customerId}", editCustomerInput: {${editedData}}) {
          ${returnedData}
        }
      }
    `
  };
  const editedCustomer = await Post(EditCustomer);
  return editedCustomer.data.data;
};

export const AddCustomerToCompany = async (
  customerId,
  companyId,
  returnedData
) => {
  const AddCustomerToCompany = {
    query: `
      mutation {
        addCustomerToCompany(customerId: "${customerId}", companyId: "${companyId}") {
          ${returnedData}
        }
      }
    `
  };
  const returnedCustomer = await Post(AddCustomerToCompany);
  return returnedCustomer.data.data;
};
