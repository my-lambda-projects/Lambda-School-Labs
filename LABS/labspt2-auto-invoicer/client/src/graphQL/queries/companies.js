import {Post} from "..";

export const FetchCompanies = async (returnedData) => {
  const Companies = {
      query: `
        query {
          companies {
            ${returnedData}
          }
        }
      `
    }

    const listOfCompanies = await Post(Companies)
    return listOfCompanies.data.data
};


export const FetchCompany = async (companyID, returnedData) => {
  const Company = {
    query: `
      query {
        company(companyID: "${companyID}") {
          ${returnedData}
        }
      } 
      `
    }

  const returnedCompany = await Post(Company)
  return returnedCompany.data.data
};