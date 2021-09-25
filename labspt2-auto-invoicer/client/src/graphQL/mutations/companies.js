import { Post, inputToString } from '../index';

export const CreateCompany = async (companyInput, userId, returnedData) => {
  const result = inputToString(companyInput);

  const CreateCompany = {
    query: `
      mutation {
        createCompany(companyInput: {${result}}, userId: "${userId}") {
          ${returnedData}
        }
      }
    `
  };

  const newCompany = await Post(CreateCompany);
  return newCompany.data.data;
};

export const EditCompany = async (companyId, editedData, returnedData) => {
  const result = inputToString(editedData);

  const EditCompany = {
    query: `
        mutation {
          editCompany(companyId: "${companyId}", editCompanyInput: {${result}}) {
            ${returnedData}
          }
        }
      `
  };

  const editedCompany = await Post(EditCompany);
  return editedCompany.data.data;
};

export const BuyPlanOrCredits = async (companyId, quantity, returnedData) => {
  const BuyPlanOrCredits = {
    query: `
      mutation {
        buyPlanOrCredits(companyId: "${companyId}", quantity: ${quantity}) {
          ${returnedData}
        }
      }
    `
  };

  const updatedCompany = await Post(BuyPlanOrCredits);
  return updatedCompany.data.data;
};
