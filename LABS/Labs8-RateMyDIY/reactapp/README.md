# RateMyDIY
A React app for people to share and rate DIY projects

### Prerequisites

- Install [yarn](https://yarnpkg.com/en/docs/install#windows-stable) or [npm](https://www.npmjs.com/get-npm). These are needed to install dependencies and run the local server.

### Installing a developer environment

1. Fork this repository and `clone` to your local machine.
1. From your console, cd into [/server](/server) and type `npm install` or `yarn install` to install the server dependencies.
1. Type `yarn start` or `npm run-script start` to run the included script `nodemon server.js` from [package.json](package.json).
1. CD into [/reactapp](/reactapp).
1. Type `yarn install` or `npm install` to install ReactJS dependencies.
1. Type `yarn start` or `npm start` to run the developer client.

## Start & watch

    $ npm start OR yarn start

## Simple build for production

    $ npm run build

## Update sources

Some packages usages might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune OR yarn install --force
    $ npm install OR yarn

To run those 3 npm commands you can just do

    $ npm run pull

---

## Languages & tools

### JavaScript

* [ReactJS](https://reactjs.org/)
- [Redux](redux.js.org/)
* [React Router](https://reacttraining.com/react-router/core/guides/philosophy)
* [Axios](https://www.npmjs.com/package/axios)
* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Knex](https://knexjs.org/)
* [GraphQL](https://graphql.org/)

### DBMS
* [MS SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-editions-express)

### CSS

- [styled-components](https://www.styled-components.com/)
- [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp)