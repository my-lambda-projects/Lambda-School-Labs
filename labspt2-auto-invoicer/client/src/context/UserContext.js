import React from 'react';

export default React.createContext({
  user: {
    _id: '',
    email: '',
    name: '',
    phoneNumber: '',
    companies: [],
    invoices: [],
    defaultCompany: '',
    premium: '',
    premiumExpiresOn: '',
    newAccount: ''
  },
  company: {
    _id: '',
    name:'',
    email:'',
    phoneNumber: '',
    address1:'',
    address2:'',
    zipCode: '',
    city: '',
    state: '',
    customers: [],
    items: [],
    invoices: [],
  }
});
