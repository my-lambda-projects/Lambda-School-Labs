<h1 align="center">
  <a href="https://tenantly.netlify.com/">
    <!-- <img alt="Tenantly" src="" width="120" /> -->
    Tenantly
  </a>
      <h3>Take care of tedious property management tasks in one place. Be in charge of your properties, anytime, anywhere.</h3>
</h1>

[Tenantly](https://tenantly.netlify.com/) is a property management application that makes the communication and financial transactions easier between the tenant and landlord. With two distict dashboards both tenants and clients have all of the tools needed to efficiently resolve work orders and track payments.

## Team

<!-- prettier-ignore -->
| [**Lee Formento**](https://github.com/leeformento) | [**Travis Russell**](https://github.com/travis-russell) | [**Kyle Teeter**](https://github.com/kyleteeter) | [**Matthew Meitl**](https://github.com/mmeitl) | [**Victor Gordian**](https://github.com/sweetooth101) | 
|:------------:|:------------:|:-----------:|:-----------:|:-----------:|
| [<img src="https://avatars3.githubusercontent.com/u/39426065?s=400&v=4" width="80">](https://github.com/leeforment) | [<img src="https://avatars1.githubusercontent.com/u/35874527?s=400&v=4" width="80">](https://github.com/travis-russell) | [<img src="https://avatars1.githubusercontent.com/u/29210839?s=400&u=41de0e5b5cf70ed8d0e663fe7643baf936d2b379&v=4" width="80">](https://github.com/kyleteeter) | [<img src="https://avatars2.githubusercontent.com/u/13967366?s=400&v=4" width="80">](https://github.com/mmeitl) | [<img src="https://avatars0.githubusercontent.com/u/41352551?s=400&v=4" width="80">](https://github.com/sweetooth101) | 
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/leeformento) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/travis-russell) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/kyleteeter) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/mmeitl) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/sweetooth101) | 

# Quick Start

1. Put your environment variables at `/front-end/.env` and `/back-end/.env`
2. Inside `/front-end` install all dependencies and spin up the server:
   ```
   npm install && npm start
   ```
3. Inside `/back-end` install all dependencies and start the front-end:
   ```
   npm install && npm start
   ```

Now just open [http://localhost:3000](http://localhost:3000) to visit the frontend, or query the server endpoints directly at [http://localhost:9000](http://localhost:9000).

# Resources

- [Wireframes](https://balsamiq.cloud/snv27r3/pqivtqy/r6F6C)

# Scripts

## Testing

`npm test`: When run inside the `/back-end` directory, runs all backend tests 


## Running

From the root directory:

`cd front-end && yarn start`: Runs the frontend client

`cd back-end && yarn start`: Runs the backend server

> **Note:** Make sure you delete `node_modules` directories when dependencies change between merges.

# Environment Variables

These reside in the `/front-end/.env` file, which is ignored by `git` for security reasons.

TODO: Add all required environment variables.

| Variable | Description |
| :------- | :---------- |
| `XXXXX`  | .....       |

## Heroku Variables

Our Heroku backend lives at [https://tenantly-back.herokuapp.com/](https://tenantly-back.herokuapp.com/).

Make sure you define the `JWT_SECRET` and `NODE_ENV` variables in the Heroku dashboard.

## Deployment

The app front-end is deployed on Netlify and the back-end is deployed on Heroku.

### Front-end Deployment

[![Netlify Status]](https://tenantly.netlify.com/)

The front-end is deployed via Netlify. For the build settings the base directory is `front-end`, build command is `npm build`, publish directory is `font-end/build`

### Back-end Deployment

TODO: How to set up back-end deployement

# API

TODO: Fill our the `req` and `res` columns of the API tables.

## Users Routes

| Method | Endpoint             | Request | Response |
| ------ | -------------------- | ------- | -------- |
| GET    | /users               |         |          |
| POST   | /users               |         |          |
| GET    | /users/:id/          |         |          |
| GET    | /api/tenant/:id      |         |          |
| GET    | /api/admins/:id      |         |          |
| PUT    | /users/:id           |         |          |
| DELETE | /users/:id           |         |          |

## Favorites Routes

| Method | Endpoint            | Request | Response |
| ------ | ------------------- | ------- | -------- |
| GET    | /api/favorites      |         |          |
| GET    | /api/favorites/:uid |         |          |
| DELETE | /api/favorites/:uid |         |          |
| PUT    | /api/favorites/:uid |         |          |
| POST   | /api/favorites/:uid |         |          |

## Stripe Routes

| Method | Endpoint         | Request | Response |
| ------ | ---------------- | ------- | -------- |
| GET    | /charges         |         |          |
| POST   | /charge          |         |          |


# App Usage & User Story

## User Access

Tenants and Landlords are required to sign in to use the app.

## Tenant - Make a payment

1. Navigate to the Dashboard or Payments tab
2. Select either pay full amount or pay installments
3. Enter payment information and click the Pay button.

## Tenant - Submit a work order

1. Navigate to _Maintenance_ or select Submit Work Order in the dashboard.
2. Enter the details of the issue. Check the permission to enter box if applicable.
3. Select an image to upload and then click the Upload button.
4. Once all of the information is entered click Save.

## Tenant - Update personal information

1. Navigate to _Settings_.
2. Update the information that you would like to change. 
3. Once everything has been update in the form click Update.

## Landlord - Add property

1. Navigate to the _Properties_ tab. 
2. Select the Add New Property box.
3. Fill out each of the form feilds.
4. Once the form is complete click the Save button.

## Landlord - See workorders and Update status

1. Navigate the the _Work Orders_ tab. 
2. Review work orders.
3. When the status of a work order is complete simple select the corresponding radio button.

## Landlord - Add Tenant

1. Navigate the the _Add Tenant_ tab.
2. Enter the New tenant's information and Upload the Application.
3. Once the information is complete click the Create Tenant button.

## Landlord - Sent Contract to Tenant 

1. Navigate the the _Add Tenant_ tab.
2. Scroll down to the Housing Info section.
3. Choose the start and end date.
4. Select the Property.
5. Click send Contract.

## Landlord - Check billing/payment history 

1. Navigate the the _Billing_ tab.
2. Select the property you would like to see in the dropdown menu.
3. The Rental Payment History will display in the card to the right (or below on mobile)

## Landlord - Update personal information

1. Navigate to _Settings_.
2. Update the information that you would like to change. 
3. Once everything has been update in the form click Update.

# Tech Stack

## Backend Dependencies

### [Node.js](https://nodejs.org/en/)

An open-source, cross-platform JS run-time environment that executes JS outside of the browser. Node.js is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability.

### [Express](http://expressjs.com/)

A prebuilt Node.js framework that makes creating server side applications simple, fast, and flexible.

### [PostgreSQL](https://www.postgresql.org/)

PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

### [dotenv](https://github.com/motdotla/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.



## Frontend Dependencies

### [React 16 / ReactDOM](https://reactjs.org/)

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

### [React Router](https://www.npmjs.com/package/react-router-dom)

DOM bindings for React Router. Declarative routing for React.

### [axios](https://www.npmjs.com/package/react-axios)

A lightweight, promise-based HTTP client with an intuitive API that makes interfacing with a REST API simple.

### [Stripe](https://stripe.com/docs/)

A powerful, simple, and seamless payment commerce solution.

### [Material-UI](https://material-ui.com/)

React components that implement Google's Material Design.

### [Styled Components](https://www.styled-components.com/docs/)

Has a thriving community and offers the ability to directly style multiple components within a file. The syntax used is familiar to JavaScript and improves code cleanliness and makes it easy to get up and going for those without a lot of css experience. Styled components are also very efficient, improving load time for users.

### [Font Awesomes Icons](https://fontawesome.com/icons?d=gallery)

Font Awesome has many prebuilt icons that and be size and style very efficiently.

# Contributing

Currently we're only accepting PRs from members of our team.

# Issues

If you would like to report an issue, bug, or improvement, please [file an issue](https://github.com/Lambda-School-Labs/labspt2-property-management/issues/new).

# [License](LICENSE)

MIT © [Tenantly](https://github.com/Lambda-School-Labs/labspt2-property-management)
