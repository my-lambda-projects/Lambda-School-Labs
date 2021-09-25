import {Post} from "../index";

export const FetchUsers = async (returnedData) => {
  const Users = {
      query: `
        query {
          users {
            ${returnedData}
          }
        }
      `
    }

    const listOfUsers = await Post(Users)
    return listOfUsers.data.data
};


export const FetchUser = async (userID, returnedData) => {
  const User = {
    query: `
      query {
        user(userID: "${userID}") {
          ${returnedData}
        }
      } 
      `
    }

  const returnedUser = await Post(User)
  return returnedUser.data.data
};