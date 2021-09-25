export const customerData = `
  _id
  name
  email
  phoneNumber
  address1
  address2
  zipCode
  city
  state
`;

export const itemData = `
  _id
  name
  description
  quantity
  cost
  amount
`;

export const invoiceData = `
  _id
  createdBy
  number
  description
  terms
  date
  dueDate
  company {
    _id
    name
    email
    phoneNumber
    address1
    address2
    zipCode
    city
    state
  }
  customer {
    ${customerData}
  }
  items {
    ${itemData}
  }
  subtotal
  discount
  tax
  shipping
  total
  balance
  notes
  paid
  hidden
`;

export const companyData = `
  _id
  name
  email
  phoneNumber
  address1
  address2
  zipCode
  city
  state
  customers {
    ${customerData}
  }
  items {
    ${itemData}
  }
  invoices {
    ${invoiceData}
  }
`;

export const userData = `
  _id
  email
  name
  phoneNumber
  invoices {
    ${invoiceData}
  }
  companies {
    _id
    name
  }
  defaultCompany
  premium
  premiumExpiresOn
  newAccount
`;
