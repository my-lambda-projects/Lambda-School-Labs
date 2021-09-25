# Table of Contents
- [What is Family Tabs](#family-tabs)
- [Tech-Stack](#tech-stack)
    - [Front-End Dependencies](#front-end-dependencies)
        - [React](#react)
        - [BlueprintJS](#BlueprintJS)
        - [MomentJS](#MomentJS)
        - [Cheeseburger Menu](#Cheeseburger-Menu)
        - [React Hamburger Menu](#React-Hamburger-Menu)
        - [Axios](#axios)
        - [Styled Components](#styled-components)
        - [React Big Calendar](#react-big-calendar)
  - [Back-End Dependencies](#back-end-dependencies)
    - [ExpressJS](#expressjs)
    - [Proptypes](#proptypes)
    - [React Date Picker](#react-date-picker)
    - [React DOM](#react-dom)
    - [React Responsive Carousel](#react-responsive-carousel)
    - [React Router](#react-router)
    - [React Router DOM](#react-router-dom)
    - [React Select](#react-select)
    - [Stripe](#stripe)
    - [React Switch](#react-switch)
    - [React Tabs](#react-tabs)

  - [Backend API](#backend-api)
    - [Axios](#axios)
    - [bcryptjs](#bcryptjs)
    - [Cors](#cors)
    - [Cron](#cron)
    - [Express](#express)
    - [JSONWebToken](#JSONWebToken)
    - [Knex](#knex)
    - [MomentJS](#MomentJS)
    - [Nodemon](#Nodemon)
    - [Node Postgres](#node-postgres)
    - [SQLite3](#sqlite3)
    - [Twilio](#twilio)
    - [Create Event](#create-events)
    - [Change Event](#change-events)
    - [State Calls](#state-calls)
    - [Routmaker](#routemaker)

  - [Running Scripts](#running-scripts)

  - [Environment Variables](#environment-variables)
    - [Auth 0 Setup](#Auth0-set-up)
    - [Stripe Setup](#Stripe-Setup)
    - [Twilio Setup](#Twilio-Setup)

# Family-Tabs

Family Tabs helps families to stay on top of events related to everything from recitals, to soccer games to doctor’s appointments.  Parents can view events on one screen, mark off events that have passed and edit existing events.  Family accounts allow full integration with the ability for older children to add events in real time and on the go to the app.  Parents can edit events made by children and manage schedules with ease. 

Find us here: [Family Tabs!](https://family-tabs.netlify.com/)

# Tech-Stack

## Front-End Dependencies

### React

React offers reusable components that can be used on multiple pages, such as our individual Family Tabs.   It is scalable toward larger accounts, or even enterprise level accounts as an eventuality.  React has easier state management in that multiple dates and times will be added, edited and deleted in real time.  It also offers robust documentation and wide implementation makes react the more stable reliable choice.  | [View Dependency](https://reactjs.org/docs/getting-started.html)

### BlueprintJS

Blueprint is a React-based UI toolkit for the web. It is optimized for building complex data-dense interfaces for desktop web applications.  [View Dependency](https://github.com/palantir/blueprint)

### MomentJS

Moment simplifies parsing, validating, manipulating, and displaying dates and times in JavaScript.  Moment is designed to work in the browser and NodeJS. [View Dependency](https://github.com/moment/moment/)

### Cheeseburger-Menu

A simple sliding menu component for React. 

[View Dependency](https://www.npmjs.com/package/cheeseburger-menu)

### React-Hamburger-Menu

Built for React, this is a handy UI component for a menu icon in a mobile site or application. [View Dependency](https://www.npmjs.com/package/react-hamburger-menu)

### Axios

This HTTP client is promise based and works very well with a REST API. | [View Dependency](https://www.npmjs.com/package/react-axios)

### Styled Components

This dependency allows the developer to directly style components within each file.  There is fantastic documentation, and an active community.  The syntax uses JavaScript component syntax, and therefore is easy to read for future developers on the project. | [View Dependency](https://www.styled-components.com/docs/)

### React Big Calendar

An events calendar component built for React and made for modern browsers (read: IE10+) and uses flexbox over the classic tables-ception approach.
| [View Dependency](https://github.com/intljusticemission/react-big-calendar)

## Back-End Dependencies 

### Express

Express is a minimal, flexible and highly customizable framework using the JS language that we will be using on the front-end.  Knowing that all team members would be hopping back and forth between front end and back end made choosing a javascript framework the better choice for us.
| [View Dependency](http://expressjs.com/)

### Cors
Cors is a node.js package for providing a connect express middleware that can be used to enable cors with various options. 
| [View Dependency](https://github.com/expressjs/cors)

### Proptypes

ou can use prop-types to document the intended types of properties passed to components. React (and potentially other libraries—see the checkPropTypes() reference below) will check props passed to your components against those definitions, and warn in development if they don’t match.
| [View Dependency](https://github.com/facebook/prop-types)

### React Date Picker

A simple and reusable Datepicker component for React.

| [View Dependency](https://www.npmjs.com/package/react-datepicker)

### React-dom

This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm.

| [View Dependency](https://github.com/facebook/react/tree/master/packages/react-dom)

### React Responsive Carousel

Powerful, lightweight and fully customizable carousel component for React apps.

| [View Dependency](https://github.com/leandrowd/react-responsive-carousel)

### React Router

React Router is a collection of navigational components that compose declaratively with your application.

| [View Dependency](https://reacttraining.com/react-router/)

### React Router Dom

React Router is a collection of navigational components that compose declaratively with your application.

| [View Dependency](https://www.npmjs.com/package/react-router-dom)

### React Select

https://react-select.com/

| [View Dependency](https://react-select.com/)


### Stripe

Stripe offers and easily integratable payment systems for applications in order to process subscription feeds | [View Dependency](https://stripe.com/docs/)

### React-Switch

Draggable toggle-switch component for react. | [View Dependency](https://www.npmjs.com/package/react-switch)

### React-Tabs

An accessible and easy tab component for ReactJS. | [View Dependency](https://github.com/reactjs/react-tabs)


## Backend API

### Axios

This HTTP client is promise based and works very well with a REST API. | [View Dependency](https://www.npmjs.com/package/react-axios)

### BCryptJS

Optimized bcrypt in JavaScript with zero dependencies | [View Dependency](https://github.com/dcodeIO/bcrypt.js)

### Cron
Cron is a tool that allows you to execute something on a schedule. This is typically done using the cron syntax. You can execute a function whenever your scheduled job triggers. can also execute a job external to the javascript process using child_process. Additionally, this library goes beyond the basic cron syntax and allows you to supply a Date object. This will be used as the trigger for your callback. | [View Dependency] (https://github.com/kelektiv/node-cron)

### Express
Fast, unopinionated, minimalist web framework for node. | [View Dependency](https://github.com/expressjs/express)

### JSONWebToken
JSON Web Token (JWT) is a compact, URL-safe means of representing
claims to be transferred between two parties.  The claims in a JWT
are encoded as a JSON object that is used as the payload of a JSON
Web Signature (JWS) structure or as the plaintext of a JSON Web
Encryption (JWE) structure, enabling the claims to be digitally
signed or integrity protected with a Message Authentication Code
(MAC) and/or encrypted. | [View Dependency](https://github.com/auth0/node-jsonwebtoken)

### Knex
A batteries-included, multi-dialect (MSSQL, MySQL, PostgreSQL, SQLite3, Oracle (including Oracle Wallet Authentication)) query builder for Node.js. | [View Dependency](https://github.com/tgriesser/knex)

### MomentJS

Moment simplifies parsing, validating, manipulating, and displaying dates and times in JavaScript.  Moment is designed to work in the browser and NodeJS. [View Dependency](https://github.com/moment/moment/)

### Nodemon

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

Nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node, to use nodemon replace the word node on the command line when executing your script. | [View Dependency](https://github.com/remy/nodemon)

### Node-Postgres

Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings. | [View Dependency](https://github.com/brianc/node-postgres)


### SQLite3

SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. SQLite is the most used database engine in the world. It is built into all mobile phones and most computers and comes bundled inside countless other applications that people use every day.| [View Dependency](https://github.com/mapbox/node-sqlite3)

### Twilio

Reach customers using a flexible email API and marketing tools to increase customer engagement. | [View Dependency](https://github.com/twilio)



### Admin Routes

#### Create Events

POST `/createevent`

Adds a new event to schedule.

Request body should look like this:

```
{
    "scheduledEvent_name": "Baseball Game",
    "familyID": 1,
    "eventTypeID": 1,
    "locationID": 1,
    "timeDate": "January 2, 2018"
    
}
```

#### Change Events

POST `/changeevent/:id`

Changes the details of a particular event by input field. 

Request body could include these fields:

```
{
    "scheduledEvent_name": "Baseball Game",
    "timeDate": "January 2, 2018"
    
}
```

### State Calls 


POST `/newlogin`

During the new user registration process, after a family name is entered, creates a new Admin user for the site. 

```
{
    "userName": "this.state.userName",
    "email": "this.state.userEmail",
    "familyID",
    "isAdmin": "1",
    "phone": "this.state.phone"
}
```

GET `/profile/:email`

Pings auth0 to retrieve email generated during the sign up proccess. 

```
{
    "user.id",
    "user.email",
    "user.userName",
    "user.familyID",
    "user.phone",
    "user.isAdmin",
    "family.family_name",
    "user.textCheckbox"
}
```


GET `/familymembers/:id`

After login, displays all members of one family ID on the Household page. Gets the following information for each member, and displays selective information for each member on the Household page. 

```
{
    "family.family_name",
    "user.id",
    "user.userName",
    "user.phone",
    "user.email",
    "user.isAdmin",
    "user.familyID",
    "user.textCheckbox"
}
```

GET `/fulleventsbyfamily/:id`

After login, displays all event information for a specific family. Gets the following information for a family. Displays selective information on the Calendar located on the Family Tabs page. 

```
{
    "family.family_name",
    "user.userName",
    "eventWithUsers.userID",
    "scheduledEvent.scheduledEvent_name",
    "scheduledEvent.eventStart",
    "scheduledEvent.eventEnd",
    "scheduledEvent.id",
    "location.location_name",
    "location.address",
    "eventType.eventType_name",
    "scheduledEvent.pendingApproval",
    "scheduledEvent.declined",
    "scheduledEvent.approved",
    'scheduledEvent.createdBy'
}
```

### Routemaker

Routmaker contains generic endpoints that can be applied to any of the endpoints for the table listed in server.js in the server commented section. 

E.g.  

To edit a family use the family tablename endpoint found in server.js in combination with the endpoint edit/:id listed in routemaker. 

PUT `/family/edit/:familyid`

GET `/tablename/byfamily/:familyid`

From here use code in server.js in server.use to reference required body content. 

# Running Scripts

`yarn start`: Runs only the front-end client.  Navigate to FamilyTabs in order to execute this script. 

`yarn dev`: Runs only the back-end server.  Navigate to the root folder in order to execute this script. 


# Environment-Variables

To run this project locally, you will need to create two .env files. One in the CRA (familytabs) folder and one at the root.

The one in the familytabs folder requires the following keys.

REACT_APP_AUTH0_DOMAIN= *requires Auth0 setup. See below*
REACT_APP_AUTH0_CLIENT_ID=*requires Auth0 setup. See below*

REACT_APP_ROOT = http://localhost:3000
REACT_APP_AUTH0_CALLBACK_URL= http://localhost:3000/callback
REACT_APP_AUTH0_AUDIENCE= http://localhost:5000
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SSK=*requires Stripe setup. See below*
REACT_APP_SPK=*requires Stripe setup. See below*

PAYMENT_SERVER_URL=http://localhost:5000

The env file at the root should have the following set up.

SERVER_API_URL= http://localhost:5000
TWILO_ACCOUNT_SID = *requires Twilo setup. See below*
TWILO_AUTH_TOKEN = *requires Twilo setup. See below*
STRIPE_SECRET_KEY= *requires Stripe setup. See below*

# Auth0-set-up

Log in or sign up for an account at Auth0.com.

Create a new tenant domain. You will be prompted to do so if this is a new account.

Go to your dashboard and create a new single page web application.

Go to the Applications tab and open your newly created App.

Copy and paste the *domain* field into the REACT_APP_AUTH0_DOMAIN key.

Copy and paste your *Client ID* field into the REACT_APP_AUTH0_CLIENT_ID key.

Scroll down to the Allowed Callback URLs field. Enter *http://localhost:3000/callback*

In the Allowed Web Origins field, the Allowed Logout URLs field, and the Allowed Origins(CORS) field, enter *http://localhost:3000*

Under the APIs tab, create a new API. Use the identifier *http://localhost:5000*

To use our custom log in widget, go to the Hosted Pages tab, enable the Custom Login Page switch and paste the following code over the existing widget code. 

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Family Tabs Sign-in</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>

  <!--[if IE 8]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
  <![endif]-->

  <!--[if lte IE 9]>
  <script src="https://cdn.auth0.com/js/base64.js"></script>
  <script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
  <![endif]-->

  <script src="https://cdn.auth0.com/js/lock/11.11/lock.min.js"></script>
  <script>
    // Decode utf8 characters properly
    var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
    config.extraParams = config.extraParams || {};
    var connection = config.connection;
    var prompt = config.prompt;
    var languageDictionary;
    var language;
    
    if (config.dict && config.dict.signin && config.dict.signin.title) {
      languageDictionary = { title: 'Family Tabs' };
    } else if (typeof config.dict === 'string') {
      language = config.dict;
    }
    var loginHint = config.extraParams.login_hint;
    
    // Available Lock configuration options: https://auth0.com/docs/libraries/lock/v11/configuration
    var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
      auth: {
        redirectUrl: config.callbackURL,
        responseType: (config.internalOptions || {}).response_type ||
          (config.callbackOnLocationHash ? 'token' : 'code'),
        params: config.internalOptions
      },
      /* additional configuration needed for custom domains
      configurationBaseUrl: config.clientConfigurationBaseUrl,
      overrides: {
        __tenant: config.auth0Tenant,
        __token_issuer: 'YOUR_CUSTOM_DOMAIN'
      }, */
      assetsUrl:  config.assetsUrl,
      allowedConnections: connection ? [connection] : null,
      rememberLastLogin: !prompt,
      language: language,
      languageDictionary: languageDictionary,
      theme: {
        logo:'https://raw.githubusercontent.com/Lambda-School-Labs/labs9-family-tabs/master/familytabs/src/Components/images/FT_Logo_8.png',
        primaryColor:    '#242943'
      },
      prefill: loginHint ? { email: loginHint, username: loginHint } : null,
      closable: false,
      defaultADUsernameFromEmailPrefix: false,
      // uncomment if you want small buttons for social providers
      // socialButtonStyle: 'small'
    });

    lock.show();
  </script>
</body>
</html>
```


# Stripe-Setup

Login or create a stripe account at stripe.com

Under the Developers tab, select the Api keys sub tab.

Find your Publishable and Secret keys. Use that data as follows.

.env in familytabs folder
REACT_APP_SSK=Secret Key
REACT_APP_SPK=Publishable key

.env in root folder
STRIPE_SECRET_KEY= Secret Key

# Twilio-Setup

Log in or register for twilio.

Generate a free phone number. Paste that number into the from field in server/server.js line 31~

Copy your account sid and auth tokens and paste them into the proper keys in the .env in root folder.

TWILO_ACCOUNT_SID = *account sid*
TWILO_AUTH_TOKEN = *auth token*

