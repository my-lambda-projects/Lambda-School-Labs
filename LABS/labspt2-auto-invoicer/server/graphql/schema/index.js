const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String
    phoneNumber: String
    googleId: String
    facebookId: String
    companies: [Company!]
    invoices: [Invoice!]
    defaultCompany: String
    premium: Boolean
    premiumExpiresOn: Boolean
    newAccount: Boolean
  }

  type Company {
    _id: ID!
    name: String!
    email: String!
    phoneNumber: String!
    address1: String!
    address2: String
    zipCode: String!
    city: String!
    state: String!
    users: [User!]!
    customers: [Customer!]
    invoices: [Invoice!]
    items: [Item!]
    defaultTerms: String
    defaultNotes: String
    startingInvoiceNumber: String
  }

  type Customer {
    _id: ID!
    name: String!
    email: String!
    phoneNumber: String!
    address1: String!
    address2: String
    zipCode: String!
    city: String!
    state: String!
    companies: [Company!]!
    invoices: [Invoice!]
  }

  type Invoice {
    _id: ID!
    createdBy: String!
    number: String!
    description: String
    terms: String
    date: String!
    dueDate: String!
    company: Company!
    customer: Customer!
    items: [Item!]!
    subtotal: String!
    discount: String
    tax: String
    shipping: String
    total: String!
    balance: String!
    notes: String
    paid: Boolean
    hidden: Boolean
  }

  input InvoiceInput {
    createdBy: String!
    number: String!
    description: String
    terms: String
    date: String!
    dueDate: String!
    company: CompanyInput!
    customer: CustomerInput!
    items: [ItemInput!]!
    subtotal: String!
    discount: String
    tax: String
    shipping: String
    total: String!
    balance: String!
    notes: String
  }

  input EditInvoiceInput {
    createdBy: String
    number: String
    description: String
    terms: String
    date: String
    dueDate: String
    company: CompanyInput
    customer: CustomerInput
    items: [ItemInput!]
    subtotal: String
    discount: String
    tax: String
    shipping: String
    total: String
    balance: String
    notes: String
    hidden: Boolean
  }

  type Item {
    _id: ID!
    name: String!
    description: String
    quantity: String!
    cost: String!
    amount: String!
  }

  input ItemInput {
    _id: ID
    name: String!
    description: String
    quantity: String!
    cost: String!
    amount: String!
  }

  input CompanyInput {
    _id: ID
    name: String!
    email: String!
    phoneNumber: String!
    address1: String!
    address2: String
    zipCode: String!
    city: String!
    state: String!
  }

  input EditCompanyInput {
    _id: ID
    name: String
    email: String
    phoneNumber: String
    address1: String
    address2: String
    zipCode: String
    city: String
    state: String
  }

  input UserInput {
    email: String!
    name: String!
    phoneNumber: String!
  }

  input EditUserInput {
    email: String
    name: String
    phoneNumber: String
    newAccount: Boolean
  }

  input CustomerInput {
    _id: ID
    name: String!
    email: String!
    phoneNumber: String!
    address1: String!
    address2: String
    zipCode: String!
    city: String!
    state: String!
  }

  input EditCustomerInput {
    name: String
    email: String
    phoneNumber: String
    address1: String
    address2: String
    zipCode: String
    city: String
    state: String
  }

  type Country {
    name: String!
    iso2: String!
    dialCode: String!
    priority: Int!
    format: String
  }

  type RootQuery {
    users: [User!]!
    user(userId: ID!): User!
    companyByAnyField(companyInput: EditCompanyInput): [Company!]
    companies: [Company!]!
    company(companyId: ID!): Company!
    customers: [Customer!]!
    customer(customerId: ID!): Customer!
    countries: [Country!]!
    country(name: String, iso2: String): Country!
    invoices: [Invoice!]!
    invoice(invoiceId: ID!): Invoice!
    items: [Item!]!
    item(itemId: ID!): Item!
  }

  type RootMutation {
    createUser(userInput: UserInput!): User
    createCompany(companyInput: CompanyInput!, userId: ID!): Company
    createCustomer(customerInput: CustomerInput!, companyId: ID!): Customer
    createItem(itemInput: ItemInput!, companyId: ID!): Item
    createInvoice(invoiceInput: InvoiceInput!): Invoice
    editUser(userId: ID!, editUserInput: EditUserInput!): User
    editCompany(editCompanyInput: EditCompanyInput!, companyId: ID!): Company
    editCustomer(customerId: ID!, editCustomerInput: EditCustomerInput!): Customer
    editInvoice(editInvoiceInput: EditInvoiceInput!, invoiceId: ID!): Invoice
    addCustomerToCompany(customerId: ID!, companyId: ID!): Customer
    addUserToCompany(userId: ID!, companyId: ID!): Company
    buyPremium(userId: ID!): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
