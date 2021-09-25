<h1 align="center">WEBPT2 AutoInvoicer App</h1>

<div align="center"><h2>Brought to you by:</h2>

<a href="#">Abdiel Fernandez</a>

<a href="#">Andrés Rivera Toro</a>

<a href="#">Dewayne Lindsay</a>

<a href="#">Jorge Osto</a>

<a href="#">Paul Apivat Hanvongse</a>

</div>

# MyAutoInvoicer

# Description

MyAutoInvoicer allows users to easily generate, track, analyze, save and send invoices to their customers. With our App, users can easily keep track of all invoices to understand all of their customers. MyAutoInvoicer helps small businesses ensure that sales turns into cashflow.

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
  - [Frontend Built Using](#frontend-built-using)
  - [Backend Built Using](#backend-built-using)
  - [Reasoning](#reasoning)
  - [Tech Stack Blurb](#tech-stack-blurb)
- [Security](#security)
  - [Authentication](#authentication)
  - [Authorization](#authorization)
  - [Form Validation](#form-validation)
- [Testing](#testing)
- [Improving Performance](#improving-performance)
- [Installation Instructions](#installation-instructions)
  - [Environment Variables](#environment-variables)
  - [Using the Application](#using-the-application)
- [Contributing](#contributing)
- [Documentation](#documentation)
  - [Database](#database)
    - [Models](#models)
      - [Company Model](#company-model)
      - [Customer Model](#customer-model)
      - [User Model](#user-model)
      - [Invoice Model](#invoice-model)
      - [Item Model](#item-model)
  - [GraphQL](#graphql)
    - [Queries](#queries)
      - [On Company Model](#on-company-model)
      - [On Customer Model](#on-customer-model)
      - [On User Model](#on-user-model)
      - [On Invoice Model](#on-invoice-model)
      - [On Item Model](#on-item-model)
    - [Mutations](#mutations)
      - [Company Mutations](#company-mutations)
        - [Create Company](#create-company)
        - [Edit Company](#edit-company)
        - [Delete Company](#delete-company)
      - [Customer Mutations](#customer-mutations)
        - [Create Customer](#create-customer)
        - [Edit Customer](#edit-customer)
        - [Delete Customer](#delete-customer)
      - [User Mutations](#user-mutations)
        - [Create User](#create-user)
        - [Edit User](#edit-user)
        - [Delete User](#delete-user)
      - [Invoice Mutations](#invoice-mutations)
        - [Create Invoice](#create-invoice)
        - [Edit Invoice](#edit-invoice)
        - [Delete Invoice](#delete-invoice)
      - [Item Mutatons](#item-mutations)
        - [Create Item](#create-item)
        - [Edit Item](#edit-item)
        - [Delete Item](#delete-item)
  - [Stripe](#stripe)
  - [Free vs Premium](#free-vs-premium)
  - [Styles and Theming](#styles-and-theming)

## Tech Stack

### Frontend built using:

- React.js
- Material UI
- GraphQL
- Netlify

Deployed [here](https://www.myautoinvoicer.com)

### Backend built using:

- GraphQL
- MongoDB/Mongoose
- Node & Express
- html-pdf

Deployed [here](https://www.myautoinvoicer.com)

### Reasoning:

- React.js / Context

  - We selected React as our frontend framework because we wanted a fast and efficient framework to help us manage many reusable components interacting with each other. We are using Context to allow us to manage state, without the setup required in Redux.

* Material UI

  - Our application targets small businesses so we wanted a styling framework that would be straight-forward, clean and minimal. Material UI allows us to style our application to give our users a professional experience.

- GraphQL

  - Our team has been excited to make this application with GraphQL from the start. We wanted to provide our users with a wealth of information regarding their invoices so we knew they would need to make multiple requests to the server. GraphQL allows us to query the data more efficiently. Moreover, data would change over time and editing queries and mutations in GraphQL is much simpler than rewriting REST endpoints.

* Netlify

  - Given that we were already experimenting with newer technologies on the backend (GraphQL, Mongoose), we wanted to deploy using a platform we were familiar with.

- GraphQL

  - We knew we wanted to provider users, busy business owners, with a seamless experience by making it easy for them to save and query customer and company data. Using GraphQL in lieu of REST has made the communication between client and server more efficient.

* MongoDB/Mongoose

  - We wanted a database that would allow us to store information as JSON objects for efficient querying. MongoDB allow our application to scale, if that is necessary in the future.

* Node & Express

  - We are with Node and Express and it works well with GraphQL.

* html-pdf

  - We used the html-pdf react package to create dynamic pdfs and a server on a seperate repo to handle the creation and downloads of the pdfs. The server includes two routes accessed with axios. A POST route to fetch the data and generate a PDF and a GET route to send the generated PDF to the client. The Repo address is https://github.com/Dewayne87/pdf-server. The server is hosted on heroku.


### Tech Stack Blurb:
- Technology is the final frontier. To prepare us for this ever-changing techno-scape; We knew the labs project was a great opportunity to not only learn new tech stacks but also how to learn more efficiently in a fast paced real world setting. One example of this is when we learned React hooks and Graphql. Both are gaining popularity and for good reason. The superior syntactical querying with Graphql and its use of only one endpoint makes it an exciting look at a more straightforward server future. With react hooks, a new way of react state and life cycle management accompanying it. It makes for a potent one, two punch of functionality, and cleaner, easier to read code. In our learning we quickly found out that leveraging diverse resources of knowledge, such as videos, official docs and tech articles, was the key to quickly gaining core concepts while simultaneously improving understanding of the more nuanced parts of the tech. In conclusion, some might say the biggest part of being a coder is not what you know, but what you can learn well and learn quickly. In this project we showed that we embodied that sentiment in, not only words, but quantifiable actions.

---

# Security

### Authentication:

Our application has users authenticate with Google and Facebook Login. These are secure authentication systems that enabled our users, small business owners to sign in with their Google or Facebook account. As an added bonus, premium users will also to send information from the application to their Google accounts.

### Authorization:

Authorization is handled on the model level, with each model query checking to see if the requesting party is a free or premium user, restricting access certain privileges, and filtering responses to limit access to only those items the particular requesting party has created.

### Form Validation

Form validation is handled at the component level with Material-UI.

## Testing

Testing for myAutoInvoicer uses jest and enzyme. For the most part, components are Shallow rendered, rendering just the given components and none of its children.

In some cases, Full DOM render of the component and all its children for modification is taken.

For React components that is dependent on Context API, there are some specific tests.

### Dependencies

Install the following dependencies for testing:

`"enzyme": "^3.9.0"`
`"enzyme-adapter-react-16": "^1.12.1"`
`"jest": "^24.8.0"`

### Testing (Shallow Render)

Starting off with the App component, basic tests are designed to show that sub-components exist (i.e., Landing Page, Navigation, SignInModal, Dashboard, InvoiceList, Billing Page, Settings Page, CreateInvoiceSteppers etc. )

Next, tests are designed for _each_ sub-component (i.e., Landing Page, Dashboard, Invoice List etc). At this level, we test for components to render.

In some cases, tests have been written for small, isolated components (i.e., SignInModal). Similarly, we test to ensure that certain things are rendering (GoogleLogo, FacebookLogo etc.). For StripeElements, we test to ensure necessary components exists (StripeCheckoutForm and Typography elements).

### Testing (React Context - Shallow Render with Enzyme and Dive)

Here the idea is to create a TestComponent function. The function returns a callback with the component that is being tested wrapped around Context.Provider.

The .dive() method is then used to _deeply_ render a part of an otherwise shallow rendered component.

Components that require the `UserConsumer`, `CompanyConsumer` and `GlobalState` context are tested (i.e., CompanyDetails component, CreateInvoiceForm2\*, main App component).

\*This needs to be changed to CreateInvoiceStepper

In addition, the `MuiThemeProvider` from material-ui is also tested for the App component.

## Improving Performance

TBD

# Installation Instructions

### Environment Variables

The `SECRET_KEY` needed include:

- `SESSION_SECRET`
- `COOKIE_SECRET`
- `GOOGLE_CLIENT_SECRET`
- `FACEBOOK_APP_SECRET_KEY`
- `STRIPE_SECRET`
- `STRIPE_CHECKOUT_SECRET_KEY`

### Using the application

The following APIs are needed:

- Postmark: `POSTMARK_API`
- TaxJar: `TAX_API`
- ZipCode: `ZIPCODE_API`, `CLIENT_KEY`
- Google Calendar: `CLIENT_ID`, `DISCOVERY_DOCS`, `SCOPES`

MongoDB Atlas:

- `DB_NAME`, `DB_USER`, `DB_PASSWORD`

Dependencies needed on Frontend:

- Material-UI/Core
- Material-UI/Icons
- Material-UI/Styles
- Material-UI/Labs
- Material-UI-Pickers
- Axios
- React
- React-Router-Dom
- Recharts
- Styled-Components
- React-Testing-Library

Dependencies needed on Backend:

- Node
- Express
- Express-GraphQL
- GraphQL
- Helmet
- Mongoose
- Passport

- Once you have those dependencies:
- Fork and clone repo
- Add environment variables to a `.env` folder at the root of the project folder. Please see [Environment Variables](#environment-variables) section for how to configure envrionment variables for this project. This file will be ignored by git unless you modify the .gitignore
  ...
- From there, run `yarn` or `npm install` command to install node_modules required for the project.
- Type `yarn start` to start the React application.
- Type `yarn run dev` to start the server.

# Contributing

(note: change links)

If you would like to contribute to the project, please see our <a href=".github/CONTRIBUTING.md">Contributing Guidelines</a> which include issue templates for submitting <a href=".github/ISSUE_TEMPLATE/feature_request.md">feature requests</a>, <a href=".github/ISSUE_TEMPLATE/bug_report.md">bug fixes</a>, and a template for submitting <a href=".github/pull_request_template.md">pull requests</a>.

Please read our <a href="CODE_OF_CONDUCT.md">Code of Conduct</a> before contributing!

# Documentation

### Models

#### Company Model

Fields added to Company model:

```
- name
- email
- phone_num
- country_code
- address_1
- address_2
- city
- state
- postal_code
- country
- unlimited_tier
- credits
- users
- customers
- invoices

```

#### Customer Model

Fields added to Customer model:

```
- name
- email
- phone_num
- country_code
- address_1
- address_2
- city
- state
- postal_code
- country
- companies
- invoices
```

#### User Model

Fields added to User model:

```
- email
- name
- phone_num
- companies
- invoices
- googleId
- facebookId
```

#### Invoice Model

Fields added to Invoice model:

```
- invoiceNumber
- invoiceDescription
- selectionDate
- invoiceDueDate
- company
- addressFrom
- cityTo
- stateTo
- zipCodeTo
- addressTo
- emailTo
- subtotal
- discount
- tax
- shipping
- total
- amountPaid
- balanceDue
- notes
- terms
- paid
- companyID
- companyName
- userID
- userName
- customerID
- invoiceItems
```

#### Item Model

Fields added to Item model:

```
- description
- quantity
- rate
- amount
```

## GraphQL

### Queries

#### On Company Model:

- company(companyID: `${companyID}`) query will search for a single company with id and return to the client with that company.
- `companies` query will return all companies

#### On Customer Model:

- customer(customerID: `${customerID}`) query will search for a single customer with id and return to the client with that customer.
- `customers` query will return all customers

#### On User Model:

- user(user: `${userID}`) query will search for a single user with id and return to the client with that user.
- `users` query will return all users

#### On Invoice Model:

- invoice(invoice: `${invoiceID}`) query will search for a single invoice with id and return to the client with that invoice.
- `invoices` query will return all invoices

#### On Item Model:

- TBD

### Mutations:

#### Company Mutations:

##### Create Company

```
const CreateCompany = async (companyInput, returnedData) => {
  const result = inputToString(companyInput)

  const CreateCompany = {
    query: `
      mutation {
        createCompany(companyInput: {${result}} ) {
          ${returnedData}
        }
      }
    `
  };

  const newCompany = await Post(CreateCompany)
  return newCompany.data.data
}
```

##### Edit Company

```
const EditCompany = async (companyID, editedData, returnedData) => {
editedData = inputToString(editedData)

    const EditCompany = {
      query: `
        mutation {
          editCompany(companyID: "${companyID}", editCompanyInput: {${editedData}}) {
            ${returnedData}
          }
        }
      `
    };

    const editedCompany = await Post(EditCompany)
    return editedCompany.data.data
}
```

##### Edit Company (Buy Plan or Credits)

```
const BuyPlanOrCredits = async (companyID, quantity, returnedData) => {
  const BuyPlanOrCredits = {
    query: `
      mutation {
        buyPlanOrCredits(companyID: "${companyID}", quantity: ${quantity}) {
          ${returnedData}
        }
      }
    `
  };

  const updatedCompany = await Post(BuyPlanOrCredits)
  return updatedCompany.data.data
}
```

#### Customer Mutations:

##### Create Customer

```
const CreateCustomer = async (customerInput, returnedData) => {
  const result = inputToString(customerInput);

  const CreateCustomer = {
    query: `
      mutation {
        createCustomer(customerInput: {${result}}) {
          ${returnedData}
        }
      }
    `
  };
  const newCustomer = await Post(CreateCustomer);
  return newCustomer.data.data;
};
```

##### Edit Customer

```
const EditCustomer = async (customerID, editedData, returnedData) => {
  inputToString(editedData);

  const EditCustomer = {
    query: `
      mutation {
        editCustomer(customerID: "${customerID}", editCustomerInput: {${editedData}}) {
          ${returnedData}
        }
      }
    `
  };
  const editedCustomer = await Post(EditCustomer);
  return editedCustomer.data.data;
};
```

##### Edit Customer (Add Customer to Company)

```
const AddCustomerToCompany = async (
  customerID,
  companyID,
  returnedData
) => {
  const AddCustomerToCompany = {
    query: `
      mutation {
        addCustomerToCompany(customerID: "${customerID}", companyID: "${companyID}") {
          ${returnedData}
        }
      }
    `
  };
  const returnedCustomer = await Post(AddCustomerToCompany);
  return returnedCustomer.data.data;
};

```

#### User Mutations:

##### Create User

```
const CreateUser = async (userInput, returnedData) => {
  inputToString(userInput)

  const CreateUser = {
    query: `
      mutation {
        createUser(userInput: {${userInput}} ) {
          ${returnedData}
        }
      }
    `
  };

  const newUser = await Post(CreateUser)
  return newUser.data.data
}
```

##### Edit User

```
const EditUser = async (userID, editedData, returnedData) => {
  editedData = inputToString(editedData)

    const EditUser = {
      query: `
        mutation {
          editUser(userID: "${userID}", editUserInput: {${editedData}}) {
            ${returnedData}
          }
        }
      `
    };

    const editedUser = await Post(EditUser)
    return editedUser.data.data
}
```

##### Edit User (Add User to Company)

```
const AddUserToCompany = async (userID, companyID, returnedData) => {
  const AddUserToCompany = {
    query:  `
      mutation {
        addUserToCompany(userID: "${userID}", companyID: "${companyID}") {
          ${returnedData}
        }
      }
    `
  }

  const returnedCompany = await Post(AddUserToCompany);
  return returnedCompany.data.data
}
```

#### Invoice Mutations:

##### Create Invoice

```
const CreateInvoice = async (invoiceInput, returnedData) => {
  const result = inputToString(invoiceInput);
  console.log("invoice input:", result);
  const CreateInvoice = {
    query: `
            mutation {
                createInvoice(invoiceInput: {${result}}) {
                    ${returnedData}
                }
            }
        `
  };
  console.log("create invoice", CreateInvoice);
  const newInvoice = await Post(CreateInvoice);
  console.log("new invoice", newInvoice);
  return newInvoice.data.data;
};
```

##### Edit Invoice

```
const EditInvoice = async (invoiceID, editedData, returnedData) => {
  editedData = inputToString(editedData);

  const EditInvoice = {
    query: `
            mutation {
                editInvoice(invoiceID: "${invoiceID}", editInvoiceInput: {${editedData}}) {
                    ${returnedData}
                }
            }
        `
  };
  const editedInvoice = await Post(EditInvoice);
  return editedInvoice.data.data;
};
```
##### Edit Invoice (Amount Paid)

```
 const EditAmountPaid = async (invoiceID, amountPaid, returnedData) => {
  
  const EditAmountPaid = {
    query: `
                mutation {
                    editInvoice(invoiceID: "${invoiceID}", editInvoiceInput: {amountPaid: "${amountPaid}"}) {
                        ${returnedData}
                    }
                }
            `
  };
  const editedAmount = await Post(EditAmountPaid);
  return editedAmount.data.data;
};
```
##### Edit Invoice (Edit total)

```
const EditTotal = async (invoiceID, total, returnedData) => {
  const EditTotal = {
    query: `
                  mutation {
                      editInvoice(invoiceID: "${invoiceID}", editInvoiceInput: {total: "${total}"}) {
                          ${returnedData}
                      }
                  }
              `
  };
  const editedTotal = await Post(EditTotal);
  return editedTotal.data.data;
};

```
##### Edit Invoice(Edit Balance Due)

```
export const EditBalanceDue = async (invoiceID, balanceDue, returnedData) => {
  const EditBalanceDue = {
    query: `
                      mutation {
                          editInvoice(invoiceID: "${invoiceID}", editInvoiceInput: {balanceDue: "${balanceDue}"}) {
                              ${returnedData}
                          }
                      }
                  `
  };
  const editedBalanceDue = await Post(EditBalanceDue);
  return editedBalanceDue.data.data;
};

```

##### Edit Invoice (Add Invoice to Company)

```
const AddInvoiceToCompany = async (
  invoiceID,
  companyID,
  returnedData
) => {
  const AddInvoiceToCompany = {
    query: `
            mutation {
                addInvoiceToCompany(invoiceID: "${invoiceID}", companyID: "${companyID}") {
                    ${returnedData}
                }
            }
        `
  };
  const returnedInvoice = await Post(AddInvoiceToCompany);
  return returnedInvoice.data.data;
};

```

#### Item Mutations:

##### Create Item

```
const CreateItem = async (itemInput, returnedData) => {
  const result = inputToString(itemInput);

  const CreateItem = {
    query: `
      mutation {
        createItem(itemInput: {${result}}) {
          ${returnedData}
        }
      }
    `
  };
  const newItem = await Post(CreateItem);
  return newItem.data.data;
};

```

##### Edit Item

```
TBD
```

##### Delete Item

```
TBD
```

## Stripe:

We are using Stripe in order to accept payments from users of the application. We are utilizing `stripe`, `passport-stripe` and `react-stripe-elements` in order to accomplish this. When the user completes checkout, a request is then sent to the server with BuyPlanOrCredits mutation and the type of subscription the user selected.

## ZipcodeAPI:

We are using ZipcodeApi to autofill the city and state when the user creates a new customer. It takes the users inputted zipcode data and uses an axios call to send it along with a client key that we registered for to the zipcodeapi website. It returns a data object with the state and city of the given zipcode. The client key gives us 50 api calls an hour until June 2nd 2019. AFter that our free trial will be over and we will only get 10 api calls an hour. If we exceed this limit the state and city will not autofill and we will recieve a 429 status code error.

## Free vs Premium

Free users of the application are allowed to create unlimited invoices.

Premium plans cost \$6.00 per month. The perks of such a membership include unlimited invoices for unlimited companies and customers. Moreover users have the ability to save all company and customer data for future convenience.

## Styles and Theming

This project uses the Material Ui theme provider which cascades the defined theme down to all material ui components.

The theme choice is saved on localstorage and localstorage is checked for a theme choice on reload.

Font size details are located in `client/src/theme.js`. For navigation, `typography: {overline}` is used. For most pages, the main heading will be `typography: h4`. Only the landing page makes use of `typography: h1-h3`.
