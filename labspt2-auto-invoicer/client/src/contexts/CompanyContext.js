import React from 'react';

import { FetchCompany } from '../graphQL/queries/companies';

export const CompanyContext = React.createContext();

export class CompanyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyID: '',
      name: '',
      email: '',
      phone_num: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      premium: false,
      users: [],
      customers: [],
      invoices: []
    };
    const companyData = `
    _id 
    name 
    email 
    phone_num 
    address_1
    address_2 
    city 
    state 
    postal_code 
    country 
    premium`;
    const usersData = `users {_id name}`;
    const customersData = `customers {_id name}`;
    const invoicesData = `invoices {
      _id
      invoiceNumber 
      companyName 
      userName 
      invoiceDescription 
      addressFrom 
      addressTo 
      cityTo 
      stateTo 
      zipCodeTo 
      emailTo 
      selectedDate 
      invoiceDueDate 
      balanceDue 
      subtotal 
      discount
      tax 
      shipping 
      total 
      amountPaid 
      notes 
      terms
    }`;
    this.fetchCompany = async companyID => {
      const returnedData = `${companyData} ${usersData} ${customersData} ${invoicesData}`;
      const { company } = await FetchCompany(companyID, returnedData);
      this.setState({
        companyID: company._id,
        name: company.name,
        email: company.email,
        phone_num: company.phone_num,
        address_1: company.address_1,
        address_2: company.address_2,
        city: company.city,
        state: company.state,
        postal_code: company.postal_code,
        country: company.country,
        premium: company.premium,
        users: company.users,
        customers: company.customers,
        invoices: company.invoices
      });
    };

    this.fetchInvoices = async () => {
      const returnedData = `${invoicesData}`;
      const { company } = await FetchCompany(
        this.state.companyID,
        returnedData
      );
      this.setState({ invoices: company.invoices });
    };

    this.fetchUsers = async () => {
      const result = await FetchCompany(this.state.companyID, usersData);
      const { company } = result;
      this.setState({ users: company.users });
    };

    this.fetchCustomers = async () => {
      const result = await FetchCompany(this.state.companyID, customersData);
      const { company } = result;
      this.setState({ customers: company.customers });
    };

    this.fetchCompanyData = async companyID => {
      const result = await FetchCompany(companyID, companyData);
      const { company } = result;
      this.setState({
        companyID: company._id,
        name: company.name,
        email: company.email,
        phone_num: company.phone_num,
        address_1: company.address_1,
        address_2: company.address_2,
        city: company.city,
        state: company.state,
        postal_code: company.postal_code,
        country: company.country,
        premium: company.premium
      });
    };

    this.fetchPlanOrCredits = async companyID => {
      const plan = `premium`;
      const result = await FetchCompany(companyID, plan);
      const { company } = result;
      this.setState({
        premium: company.premium
      });
    };
  }

  render() {
    const {
      fetchCompany,
      fetchCustomers,
      fetchInvoices,
      fetchUsers,
      fetchPlanOrCredits
    } = this;
    const companyState = this.state;
    return (
      <CompanyContext.Provider
        value={{
          companyState,
          fetchCompany,
          fetchCustomers,
          fetchInvoices,
          fetchUsers,
          fetchPlanOrCredits
        }}
      >
        {this.props.children}
      </CompanyContext.Provider>
    );
  }
}

export const CompanyConsumer = CompanyContext.Consumer;
