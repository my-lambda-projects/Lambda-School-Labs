import React, { useReducer, useEffect } from "react";
import axios from "axios";

import UserContext from "./UserContext";

import {
  userReducer,
  GET_USER,
  GET_COMPANIES,
  GET_COMPANY,
  GET_UPDATED_USER_DATA,
  GET_UPDATED_INVOICE,
  GET_UPDATED_COMPANY_DATA
} from "./reducers";
import { userData, companyData } from "./graphql";
import { toUpdateUser, toUpdateInvoice, toUpdateCompany } from "./mutations";

const GlobalState = props => {
  const [state, dispatch] = useReducer(userReducer, {
    user: {
      _id: "",
      email: "",
      name: "",
      phoneNumber: "",
      invoices: [],
      companies: [],
      defaultCompany: "",
      premium: "",
      premiumExpiresOn: "",
      newAccount: ""
    },
    company: {
      _id: "",
      name: "",
      email: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      zipCode: "",
      city: "",
      state: "",
      customers: [],
      items: [],
      invoices: []
    }
  });

  const getUser = async () => {
    const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
      withCredentials: true
    });
    const userQuery = {
      query: `
        query {
          user(userId: "${user.data.userId}") {
            ${userData}
          }
        } 
      `
    };
    const userDetails = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/graphql`,
      userQuery
    );
    dispatch({ type: GET_USER, user: userDetails.data.data.user });
    getCompany(userDetails.data.data.user.defaultCompany);
  };

  const updateData = async companyid => {
    //this is how the component gets the newly created data and stays on the company the user was using.
    const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
      withCredentials: true
    });
    const userQuery = {
      query: `
        query {
          user(userId: "${user.data.userId}") {
            ${userData}
          }
        } 
      `
    };
    const userDetails = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/graphql`,
      userQuery
    );
    dispatch({ type: GET_USER, user: userDetails.data.data.user });
    getCompany(companyid);
  };

  const getCompanies = async () => {
    const companiesQuery = {
      query: `
        query {
          user(userId: "${state.user._id}") {
            companies {
              ${companyData}
            }
          }
        }
      `
    };
    const companies = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/graphql`,
      companiesQuery
    );
    dispatch({
      type: GET_COMPANIES,
      companies: companies.data.data.user.companies
    });
  };

  const getCompany = async companyId => {
    const companyQuery = {
      query: `
        query {
          company(companyId: "${companyId}") {
            ${companyData}
          }
        }
      `
    };
    const company = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/graphql`,
      companyQuery
    );
    dispatch({
      type: GET_COMPANY,
      company: company.data.data.company
    });
  };

  const updateUser = async editedData => {
    const user = await toUpdateUser(state.user._id, editedData);
    console.log("updated data:", user);
    dispatch({
      type: GET_UPDATED_USER_DATA,
      user: user.data.data.editUser
    });
  };

  const updateCompany = async editedData => {
    const company = await toUpdateCompany(state.company._id, editedData);
    console.log("updated company", company);
    dispatch({
      type: GET_UPDATED_COMPANY_DATA,
      company: company.data.data.editCompany
    });
  };

  const addPayment = async (invoiceId, editedData) => {
    const { balance, amountPaid } = editedData;
    const newBalance = Number(balance) - Number(amountPaid);
    editedData = { balance: newBalance.toFixed(2) };

    const invoice = await toUpdateInvoice(invoiceId, editedData);
    dispatch({
      type: GET_UPDATED_INVOICE,
      invoice: invoice.data.data.editInvoice
    });
  };

  const hideInvoice = async (invoiceId, editedData) => {
    const invoice = await toUpdateInvoice(invoiceId, editedData);

    dispatch({
      type: GET_UPDATED_INVOICE,
      invoice: invoice.data.data.editInvoice
    });
  };

  useEffect(() => {
    //console.log('[state in GlobalState]: ', state);
  }, [state]);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        company: state.company,
        getUser,
        updateData,
        getCompanies,
        getCompany,
        updateUser,
        updateCompany,
        addPayment,
        hideInvoice
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default GlobalState;
