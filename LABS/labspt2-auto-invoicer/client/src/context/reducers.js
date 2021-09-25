export const GET_USER = 'GET_USER';
export const GET_COMPANIES = 'GET_COMPANIES';
export const GET_COMPANY = 'GET_COMPANY';
export const GET_UPDATED_USER_DATA = 'GET_UPDATED_USER_DATA';
export const GET_UPDATED_COMPANY_DATA = 'GET_UPDATED_COMPANY_DATA'
export const GET_UPDATED_INVOICE = 'GET_UPDATED_INVOICE'

const getUser = (user, state) => {
  return { ...state, user };
};

const getCompanies = (companies, state) => {
  return { ...state, user: { ...state.user, companies } };
};

const getCompany = (company, state) => {
  return {...state, company}
}

const getUpdatedUserData = (user, state) => {
  return {...state, user: {...state.user, ...user} }
}

const getUpdatedCompanyData = (company, state) => {
  return {...state, company: {...state.company, ...company}}
}

const getUpdatedInvoice = (invoice, state) => {
  const invoices = state.company.invoices;
  const newInvoices = invoices.map( element => {
    if (element._id === invoice._id) {
      return element = {...element, balance: invoice.balance, hidden: invoice.hidden}
    }
    return element
  });
  return { ...state, company: {...state.company, invoices: newInvoices}}
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return getUser(action.user, state);
    case GET_COMPANIES:
      return getCompanies(action.companies, state);
    case GET_UPDATED_USER_DATA:
      return getUpdatedUserData(action.user, state);
    case GET_UPDATED_COMPANY_DATA:
      return getUpdatedCompanyData(action.company, state);
    case GET_COMPANY:
      return getCompany(action.company, state);
    case GET_UPDATED_INVOICE:
      return getUpdatedInvoice(action.invoice, state);
    default:
      return state;
  }
};
