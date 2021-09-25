import { Post, inputToString } from '../index';

export const CreateUser = async (userInput, returnedData) => {
  inputToString(userInput);

  const CreateUser = {
    query: `
      mutation {
        createUser(userInput: {${userInput}} ) {
          ${returnedData}
        }
      }
    `
  };

  const newUser = await Post(CreateUser);
  return newUser.data.data;
};

export const EditUser = async (userID, editedData, returnedData) => {
  editedData = inputToString(editedData);

  const EditUser = {
    query: `
        mutation {
          editUser(userID: "${userID}", editUserInput: {${editedData}}) {
            ${returnedData}
          }
        }
      `
  };

  const editedUser = await Post(EditUser);
  return editedUser.data.data;
};

export const AddUserToCompany = async (userID, companyID, returnedData) => {
  const AddUserToCompany = {
    query: `
      mutation {
        addUserToCompany(userID: "${userID}", companyID: "${companyID}") {
          ${returnedData}
        }
      }
    `
  };

  const returnedCompany = await Post(AddUserToCompany);
  return returnedCompany.data.data;
};

export const BuyPremium = async (userId, returnedData) => {
  const BuyPremium = {
    query: `
      mutation {
        buyPremium(userId: "${userId}") {
          ${returnedData}
        }
      }
    `
  };

  const updatedUser = await Post(BuyPremium);
  return updatedUser.data.data;
};
