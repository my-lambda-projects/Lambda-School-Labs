![Bonafind](https://bonafind.netlify.com/static/media/logo.99726a63.png)
# Bonafind.biz
Working demo at: [http://bonafind.biz](http://bonafind.biz)




Bonafind is an application that will allow users to find and review local businesses and view popular businesses in their area.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. You will also add a `.env` file to the `frontend` and `app` directories to use a private key. The frontend api key can be obtained from the Google Developer console and must be named `REACT_APP_API_KEY` in the `/frontend/.env` file. The backend stripe key can be obtained on the [Stripe](https://stripe.com/) dashboard after making an account on their website and must be named `STRIPE_SECRET` in the `/app/.env` file.

##### Check that the app is configured to be run locally.

-Make sure that `/frontend/assets/config.js` looks like the screenshot below.
(Updates 

![assets.js config](https://user-images.githubusercontent.com/40773193/52238716-f3f41100-2889-11e9-9105-7955426d2d8a.png)

-Make sure that `/app/index.js` looks like the screenshot below.
(Configures cors to run between local servers)

![index.js config](https://user-images.githubusercontent.com/40773193/52238718-f3f41100-2889-11e9-91e5-957825011c9e.png)

From your command line:

#### Front End

```bash
# cd into frontend directory
$ cd frontend

# run npm to install dependencies
$ npm install

# start the development server
$ npm run start
```

#### Back End

```bash
# cd into backend directory
$ cd backend

# run npm to install dependencies
$ npm install

# start the development server (Will run on http://localhost:9000)
$ npm run start
```

## Deployment

### Front End

- [https://bonafind.netlify.com](https://bonafind.netlify.com)

### Back End

- [https://bonafind.herokuapp.com/](https://bonafind.herokuapp.com/)

## Built With

### Front End

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start) - Routing Library
- [React Stripe Checkout](https://www.npmjs.com/package/react-stripe-checkout) - Stripe Checkout for React apps
- [Styled Components](https://www.styled-components.com/) - Styling library for CSS in JS

### Back End

- [Node.js](https://nodejs.org/) - Back end JavaScript runtime
- [BCryptJS](https://www.npmjs.com/package/bcryptjs) - Module to hash passwords
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser) - Parses cookie info
- [cors](https://www.npmjs.com/package/cors) - package for providing a Express middleware that can be used to enable CORS
- [expressjs](https://expressjs.com/) - Node.js framework
- [json web token](https://www.npmjs.com/package/jsonwebtoken) - Implements JSON web tokens
- [knex.js](https://knexjs.org/) - SQL query builder
- [md5](https://www.npmjs.com/package/md5) - a JavaScript function for hashing messages with MD5.
- [sqlite3](https://www.sqlite.org/index.html) - Library that implements SQL database engine
- [Stripe](https://stripe.com/docs) - Library to implement Stripes billing functionality

## Data Model

![Data Model](https://user-images.githubusercontent.com/40773193/51134170-097a9b80-17f4-11e9-8329-8d6e230b18fe.png)

## Authors

|                                     [**Edd Burke**](https://github.com/bummings)                                      |                                   [**Carlo Clamucha**](https://github.com/CarloC24)                                   |                                      [**Alex Dykas**](https://github.com/udykas)                                      |                                [**Brad Mortensen**](https://github.com/brad-mortensen)                                |
| :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
|     [<img src="https://avatars2.githubusercontent.com/u/34618112?s=80" width="80">](https://github.com/bummings)      |     [<img src="https://avatars3.githubusercontent.com/u/41533016?s=80" width="80">](https://github.com/CarloC24)      |      [<img src="https://avatars2.githubusercontent.com/u/34108291?s=80" width="80">](https://github.com/udykas)       |  [<img src="https://avatars1.githubusercontent.com/u/40773193?s=80" width="80">](https://github.com/brad-mortensen)   |
|              [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/bummings)              |              [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/CarloC24)              |               [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/udykas)               |           [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/brad-mortensen)           |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/) |

## License

This project is licensed under the MIT License

## Acknowledgments
