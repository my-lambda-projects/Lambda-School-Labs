## Code Climate

[![Maintainability](https://api.codeclimate.com/v1/badges/9dbd40cc5a146921dc69/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/school-calendar-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/9dbd40cc5a146921dc69/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/school-calendar-be/test_coverage)

# API Documentation

#### 1️⃣ Backend delpoyed at [Heroku](https://lab17-makata.herokuapp.com) <br>
#### Documentation Link - https://documenter.getpostman.com/view/11813969/Szzq4EoV?version=latest

# d8picker Team

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run dev** to start the local server

## Back-End Responsibilites

---

**d8picker** stores it's data in a **PostgreSQL** database. The database is made up of the following tables:

- Admin
- Templates
- Contacts
- Contacts-Admin
- Groups
- Contacts-Group
- Event-Groups

Endpoints allows the frontend to:

- Retrieve a list of contacts, events and groups.
- Retrieve information that pertains to an event.
- Update and delete events, contacts and groups data.

## Tech Stack

- axios
- bcryptjs
- cors
- dotenv
- express
- google-auth-library
- helmet
- knex
- pg
- sqlite3
- twilio
- jest
- supertest

## Endpoints

In order for the front end to access endpoints the google token is required. This token is stored in routes/token.js

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables and input their Twilio info.

create a .env file that includes the following:

1. TWILIO_ACCOUNT_SID "sid provided by Twilio".
2. TWILIO_AUTH_TOKEN "token provided by Twilio".
3. MY_PHONE_NUMBER "The phone number that recieves SMS".
4. TWILIO_NUMBER "phone number provided by Twilio".
5. DATABASE_URL
6. DB_ENV

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
